// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "./ContributionNFT.sol";

/**
 * @title VotingModule
 * @dev Handles proposal creation and voting for story chapters
 */
contract VotingModule is AccessControl, ReentrancyGuard {
    bytes32 public constant PROPOSER_ROLE = keccak256("PROPOSER_ROLE");
    
    enum VoteChoice { Approve, Reject, MergeWithEdits, Branch }
    enum ProposalStatus { Active, Finalized, Cancelled }
    
    struct Proposal {
        uint256 storyId;
        address proposer;
        string chapterHash; // IPFS hash
        uint256 branchOf; // Parent chapter ID (0 for new)
        uint256 startTime;
        uint256 endTime;
        ProposalStatus status;
        mapping(address => VoteChoice) votes;
        mapping(address => uint256) voteWeights;
        mapping(VoteChoice => uint256) voteCounts;
        mapping(VoteChoice => uint256) weightedVotes;
        address[] voters;
    }
    
    ContributionNFT public immutable contributionNFT;
    
    mapping(uint256 => Proposal) public proposals;
    mapping(uint256 => uint256[]) public storyProposals; // storyId => proposalIds
    
    uint256 private _proposalIdCounter;
    uint256 public constant VOTING_DURATION = 7 days;
    uint256 public constant MIN_QUORUM = 100; // Minimum total weight needed
    
    event ProposalCreated(
        uint256 indexed proposalId,
        uint256 indexed storyId,
        address indexed proposer,
        string chapterHash,
        uint256 endTime
    );
    
    event VoteCast(
        uint256 indexed proposalId,
        address indexed voter,
        VoteChoice choice,
        uint256 weight
    );
    
    event ProposalFinalized(
        uint256 indexed proposalId,
        VoteChoice winningChoice,
        uint256 totalWeight
    );
    
    error ProposalNotActive();
    error VotingEnded();
    error VotingNotEnded();
    error AlreadyVoted();
    error InsufficientWeight();
    error InvalidProposal();
    
    constructor(address _contributionNFT) {
        contributionNFT = ContributionNFT(_contributionNFT);
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(PROPOSER_ROLE, msg.sender);
    }
    
    /**
     * @dev Creates a new chapter proposal
     */
    function createProposal(
        uint256 storyId,
        string calldata chapterHash,
        uint256 branchOf
    ) external onlyRole(PROPOSER_ROLE) returns (uint256 proposalId) {
        if (bytes(chapterHash).length == 0) revert InvalidProposal();
        
        proposalId = ++_proposalIdCounter;
        
        Proposal storage proposal = proposals[proposalId];
        proposal.storyId = storyId;
        proposal.proposer = msg.sender;
        proposal.chapterHash = chapterHash;
        proposal.branchOf = branchOf;
        proposal.startTime = block.timestamp;
        proposal.endTime = block.timestamp + VOTING_DURATION;
        proposal.status = ProposalStatus.Active;
        
        storyProposals[storyId].push(proposalId);
        
        emit ProposalCreated(proposalId, storyId, msg.sender, chapterHash, proposal.endTime);
    }
    
    /**
     * @dev Casts a vote on a proposal
     */
    function vote(uint256 proposalId, VoteChoice choice) external nonReentrant {
        Proposal storage proposal = proposals[proposalId];
        
        if (proposal.status != ProposalStatus.Active) revert ProposalNotActive();
        if (block.timestamp >= proposal.endTime) revert VotingEnded();
        if (proposal.voteWeights[msg.sender] > 0) revert AlreadyVoted();
        
        // Calculate voting weight based on user's contributions to this story
        uint256 weight = _calculateVotingWeight(msg.sender, proposal.storyId);
        if (weight == 0) revert InsufficientWeight();
        
        proposal.votes[msg.sender] = choice;
        proposal.voteWeights[msg.sender] = weight;
        proposal.voteCounts[choice]++;
        proposal.weightedVotes[choice] += weight;
        proposal.voters.push(msg.sender);
        
        emit VoteCast(proposalId, msg.sender, choice, weight);
    }
    
    /**
     * @dev Finalizes a proposal after voting period ends
     */
    function finalizeProposal(uint256 proposalId) external {
        Proposal storage proposal = proposals[proposalId];
        
        if (proposal.status != ProposalStatus.Active) revert ProposalNotActive();
        if (block.timestamp < proposal.endTime) revert VotingNotEnded();
        
        // Calculate total voting weight
        uint256 totalWeight = 0;
        for (uint256 i = 0; i < uint256(type(VoteChoice).max) + 1; i++) {
            totalWeight += proposal.weightedVotes[VoteChoice(i)];
        }
        
        // Determine winning choice
        VoteChoice winningChoice = VoteChoice.Reject;
        uint256 maxWeight = 0;
        
        for (uint256 i = 0; i < uint256(type(VoteChoice).max) + 1; i++) {
            VoteChoice choice = VoteChoice(i);
            if (proposal.weightedVotes[choice] > maxWeight) {
                maxWeight = proposal.weightedVotes[choice];
                winningChoice = choice;
            }
        }
        
        proposal.status = ProposalStatus.Finalized;
        
        emit ProposalFinalized(proposalId, winningChoice, totalWeight);
    }
    
    /**
     * @dev Calculates voting weight based on user's contributions to a story
     */
    function _calculateVotingWeight(address user, uint256 storyId) internal view returns (uint256) {
        uint256[] memory userTokens = contributionNFT.getUserContributions(user);
        uint256 totalWeight = 0;
        
        for (uint256 i = 0; i < userTokens.length; i++) {
            ContributionNFT.ContributionData memory contribution = contributionNFT.getContribution(userTokens[i]);
            if (contribution.storyId == storyId) {
                totalWeight += contribution.weight;
            }
        }
        
        return totalWeight;
    }
    
    /**
     * @dev Returns proposal details
     */
    function getProposal(uint256 proposalId) external view returns (
        uint256 storyId,
        address proposer,
        string memory chapterHash,
        uint256 branchOf,
        uint256 startTime,
        uint256 endTime,
        ProposalStatus status
    ) {
        Proposal storage proposal = proposals[proposalId];
        return (
            proposal.storyId,
            proposal.proposer,
            proposal.chapterHash,
            proposal.branchOf,
            proposal.startTime,
            proposal.endTime,
            proposal.status
        );
    }
    
    /**
     * @dev Returns vote results for a proposal
     */
    function getVoteResults(uint256 proposalId) external view returns (
        uint256[4] memory voteCounts,
        uint256[4] memory weightedVotes
    ) {
        Proposal storage proposal = proposals[proposalId];
        
        for (uint256 i = 0; i < 4; i++) {
            voteCounts[i] = proposal.voteCounts[VoteChoice(i)];
            weightedVotes[i] = proposal.weightedVotes[VoteChoice(i)];
        }
    }
    
    /**
     * @dev Returns all proposal IDs for a story
     */
    function getStoryProposals(uint256 storyId) external view returns (uint256[] memory) {
        return storyProposals[storyId];
    }
}
