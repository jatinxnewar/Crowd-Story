// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title ContributionNFT
 * @dev ERC1155 NFT for tracking story contributions (Writing, Illustration, Editing, Narration)
 */
contract ContributionNFT is ERC1155, AccessControl, ReentrancyGuard {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    
    // Contribution types
    uint256 public constant WRITING = 1;
    uint256 public constant ILLUSTRATION = 2;
    uint256 public constant EDITING = 3;
    uint256 public constant NARRATION = 4;
    
    struct ContributionData {
        uint256 storyId;
        uint256 chapterId;
        uint256 contributionType;
        uint256 weight; // Contribution weight for revenue splits
        string metadataURI;
        uint256 timestamp;
    }
    
    mapping(uint256 => ContributionData) public contributions;
    mapping(uint256 => mapping(uint256 => uint256[])) public storyContributions; // storyId => contributionType => tokenIds
    mapping(address => uint256[]) public userContributions;
    
    uint256 private _tokenIdCounter;
    
    event ContributionMinted(
        uint256 indexed tokenId,
        address indexed contributor,
        uint256 indexed storyId,
        uint256 contributionType,
        uint256 weight
    );
    
    error InvalidContributionType();
    error InvalidWeight();
    
    constructor(string memory uri) ERC1155(uri) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
    }
    
    /**
     * @dev Mints a contribution NFT to a contributor
     */
    function mintContribution(
        address to,
        uint256 storyId,
        uint256 chapterId,
        uint256 contributionType,
        uint256 weight,
        string calldata metadataURI
    ) external onlyRole(MINTER_ROLE) nonReentrant returns (uint256 tokenId) {
        if (contributionType < 1 || contributionType > 4) revert InvalidContributionType();
        if (weight == 0) revert InvalidWeight();
        
        tokenId = ++_tokenIdCounter;
        
        contributions[tokenId] = ContributionData({
            storyId: storyId,
            chapterId: chapterId,
            contributionType: contributionType,
            weight: weight,
            metadataURI: metadataURI,
            timestamp: block.timestamp
        });
        
        storyContributions[storyId][contributionType].push(tokenId);
        userContributions[to].push(tokenId);
        
        _mint(to, tokenId, 1, "");
        
        emit ContributionMinted(tokenId, to, storyId, contributionType, weight);
    }
    
    /**
     * @dev Batch mint multiple contributions
     */
    function batchMintContributions(
        address[] calldata recipients,
        uint256[] calldata storyIds,
        uint256[] calldata chapterIds,
        uint256[] calldata contributionTypes,
        uint256[] calldata weights,
        string[] calldata metadataURIs
    ) external onlyRole(MINTER_ROLE) {
        require(
            recipients.length == storyIds.length &&
            storyIds.length == chapterIds.length &&
            chapterIds.length == contributionTypes.length &&
            contributionTypes.length == weights.length &&
            weights.length == metadataURIs.length,
            "Array length mismatch"
        );
        
        for (uint256 i = 0; i < recipients.length; i++) {
            mintContribution(
                recipients[i],
                storyIds[i],
                chapterIds[i],
                contributionTypes[i],
                weights[i],
                metadataURIs[i]
            );
        }
    }
    
    /**
     * @dev Returns contribution data for a token
     */
    function getContribution(uint256 tokenId) external view returns (ContributionData memory) {
        return contributions[tokenId];
    }
    
    /**
     * @dev Returns all contribution token IDs for a story and type
     */
    function getStoryContributions(uint256 storyId, uint256 contributionType) 
        external 
        view 
        returns (uint256[] memory) 
    {
        return storyContributions[storyId][contributionType];
    }
    
    /**
     * @dev Returns all contribution token IDs for a user
     */
    function getUserContributions(address user) external view returns (uint256[] memory) {
        return userContributions[user];
    }
    
    /**
     * @dev Returns the URI for a token's metadata
     */
    function uri(uint256 tokenId) public view override returns (string memory) {
        return contributions[tokenId].metadataURI;
    }
    
    /**
     * @dev See {IERC165-supportsInterface}
     */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC1155, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
