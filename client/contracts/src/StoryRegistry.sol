// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title StoryRegistry
 * @dev Central registry for all story configurations and metadata
 */
contract StoryRegistry is Ownable {
    struct StoryInfo {
        address owner;
        address dao;
        address revenueSplit;
        string metadataURI;
        bytes32 rulesHash;
        bool active;
        uint256 createdAt;
    }
    
    mapping(uint256 => StoryInfo) public stories;
    mapping(address => uint256[]) public storiesByOwner;
    
    address public storyFactory;
    
    event StoryRegistered(uint256 indexed storyId, address indexed owner);
    event StoryUpdated(uint256 indexed storyId, string newMetadataURI);
    event StoryDeactivated(uint256 indexed storyId);
    
    error OnlyFactory();
    error OnlyStoryDAO();
    error StoryNotFound();
    error StoryInactive();
    
    modifier onlyFactory() {
        if (msg.sender != storyFactory) revert OnlyFactory();
        _;
    }
    
    modifier onlyStoryDAO(uint256 storyId) {
        if (msg.sender != stories[storyId].dao) revert OnlyStoryDAO();
        _;
    }
    
    constructor() Ownable(msg.sender) {}
    
    /**
     * @dev Sets the story factory address (can only be called once)
     */
    function setStoryFactory(address _storyFactory) external onlyOwner {
        require(storyFactory == address(0), "Factory already set");
        storyFactory = _storyFactory;
    }
    
    /**
     * @dev Registers a new story (only callable by StoryFactory)
     */
    function registerStory(
        uint256 storyId,
        address owner,
        address dao,
        address revenueSplit,
        string calldata metadataURI,
        bytes32 rulesHash
    ) external onlyFactory {
        stories[storyId] = StoryInfo({
            owner: owner,
            dao: dao,
            revenueSplit: revenueSplit,
            metadataURI: metadataURI,
            rulesHash: rulesHash,
            active: true,
            createdAt: block.timestamp
        });
        
        storiesByOwner[owner].push(storyId);
        
        emit StoryRegistered(storyId, owner);
    }
    
    /**
     * @dev Updates story metadata (only callable by story DAO)
     */
    function updateMetadata(uint256 storyId, string calldata newMetadataURI) 
        external 
        onlyStoryDAO(storyId) 
    {
        if (!stories[storyId].active) revert StoryInactive();
        
        stories[storyId].metadataURI = newMetadataURI;
        emit StoryUpdated(storyId, newMetadataURI);
    }
    
    /**
     * @dev Deactivates a story (only callable by story DAO)
     */
    function deactivateStory(uint256 storyId) external onlyStoryDAO(storyId) {
        stories[storyId].active = false;
        emit StoryDeactivated(storyId);
    }
    
    /**
     * @dev Returns story information
     */
    function getStory(uint256 storyId) external view returns (StoryInfo memory) {
        if (stories[storyId].owner == address(0)) revert StoryNotFound();
        return stories[storyId];
    }
    
    /**
     * @dev Returns all story IDs owned by an address
     */
    function getStoriesByOwner(address owner) external view returns (uint256[] memory) {
        return storiesByOwner[owner];
    }
}
