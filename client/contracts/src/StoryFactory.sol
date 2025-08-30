// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "./StoryRegistry.sol";
import "./StoryDAO.sol";
import "./RevenueSplit.sol";

/**
 * @title StoryFactory
 * @dev Factory contract for creating new story projects with associated DAOs and revenue splits
 */
contract StoryFactory is Ownable, ReentrancyGuard {
    StoryRegistry public immutable storyRegistry;
    
    uint256 private _storyIdCounter;
    
    struct StoryConfig {
        address owner;
        string metadataURI;
        bytes32 rulesHash;
        address[] initialContributors;
        uint256[] initialSplits; // basis points (10000 = 100%)
    }
    
    event StoryCreated(
        uint256 indexed storyId,
        address indexed owner,
        address dao,
        address revenueSplit,
        string metadataURI,
        bytes32 rulesHash
    );
    
    error InvalidSplits();
    error InvalidMetadata();
    error InvalidRulesHash();
    
    constructor(address _storyRegistry) Ownable(msg.sender) {
        storyRegistry = StoryRegistry(_storyRegistry);
    }
    
    /**
     * @dev Creates a new story with DAO governance and revenue splitting
     * @param config Story configuration including metadata, rules, and initial splits
     * @return storyId The unique identifier for the created story
     */
    function createStory(StoryConfig calldata config) 
        external 
        nonReentrant 
        returns (uint256 storyId) 
    {
        if (bytes(config.metadataURI).length == 0) revert InvalidMetadata();
        if (config.rulesHash == bytes32(0)) revert InvalidRulesHash();
        
        // Validate splits sum to 10000 (100%)
        uint256 totalSplits = 0;
        for (uint256 i = 0; i < config.initialSplits.length; i++) {
            totalSplits += config.initialSplits[i];
        }
        if (totalSplits != 10000 || config.initialContributors.length != config.initialSplits.length) {
            revert InvalidSplits();
        }
        
        storyId = ++_storyIdCounter;
        
        // Deploy StoryDAO for governance
        StoryDAO dao = new StoryDAO(storyId, config.owner);
        
        // Deploy RevenueSplit for profit sharing
        RevenueSplit revenueSplit = new RevenueSplit(
            config.initialContributors,
            config.initialSplits
        );
        
        // Register the story
        storyRegistry.registerStory(
            storyId,
            config.owner,
            address(dao),
            address(revenueSplit),
            config.metadataURI,
            config.rulesHash
        );
        
        emit StoryCreated(
            storyId,
            config.owner,
            address(dao),
            address(revenueSplit),
            config.metadataURI,
            config.rulesHash
        );
    }
    
    /**
     * @dev Returns the current story counter
     */
    function getCurrentStoryId() external view returns (uint256) {
        return _storyIdCounter;
    }
}
