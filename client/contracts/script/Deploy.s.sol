// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import "../src/StoryRegistry.sol";
import "../src/StoryFactory.sol";
import "../src/ContributionNFT.sol";
import "../src/VotingModule.sol";

contract Deploy is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);
        
        // Deploy core contracts
        StoryRegistry registry = new StoryRegistry();
        ContributionNFT contributionNFT = new ContributionNFT("https://api.storytelling.app/metadata/");
        VotingModule votingModule = new VotingModule(address(contributionNFT));
        StoryFactory factory = new StoryFactory(address(registry));
        
        // Set factory address in registry
        registry.setStoryFactory(address(factory));
        
        // Grant roles
        contributionNFT.grantRole(contributionNFT.MINTER_ROLE(), address(votingModule));
        votingModule.grantRole(votingModule.PROPOSER_ROLE(), address(factory));
        
        console.log("StoryRegistry deployed at:", address(registry));
        console.log("StoryFactory deployed at:", address(factory));
        console.log("ContributionNFT deployed at:", address(contributionNFT));
        console.log("VotingModule deployed at:", address(votingModule));
        
        vm.stopBroadcast();
    }
}
