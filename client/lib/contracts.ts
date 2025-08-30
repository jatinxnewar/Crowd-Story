import type { Address } from "viem"

// Contract addresses - these would be set after deployment
export const CONTRACT_ADDRESSES = {
  STORY_FACTORY: process.env.NEXT_PUBLIC_STORY_FACTORY_ADDRESS as Address,
  STORY_REGISTRY: process.env.NEXT_PUBLIC_STORY_REGISTRY_ADDRESS as Address,
  CONTRIBUTION_NFT: process.env.NEXT_PUBLIC_CONTRIBUTION_NFT_ADDRESS as Address,
  VOTING_MODULE: process.env.NEXT_PUBLIC_VOTING_MODULE_ADDRESS as Address,
  STAKING_CONTRACT: process.env.NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS as Address,
} as const

// Simplified ABIs for the main contract functions we'll use
export const STORY_FACTORY_ABI = [
  {
    inputs: [
      {
        components: [
          { name: "owner", type: "address" },
          { name: "metadataURI", type: "string" },
          { name: "rulesHash", type: "bytes32" },
          { name: "initialContributors", type: "address[]" },
          { name: "initialSplits", type: "uint256[]" },
        ],
        name: "config",
        type: "tuple",
      },
    ],
    name: "createStory",
    outputs: [{ name: "storyId", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getCurrentStoryId",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
] as const

export const STORY_REGISTRY_ABI = [
  {
    inputs: [{ name: "storyId", type: "uint256" }],
    name: "getStory",
    outputs: [
      {
        components: [
          { name: "owner", type: "address" },
          { name: "dao", type: "address" },
          { name: "revenueSplit", type: "address" },
          { name: "metadataURI", type: "string" },
          { name: "rulesHash", type: "bytes32" },
          { name: "isActive", type: "bool" },
        ],
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const

export const CONTRIBUTION_NFT_ABI = [
  {
    inputs: [
      { name: "to", type: "address" },
      { name: "storyId", type: "uint256" },
      { name: "chapterId", type: "uint256" },
      { name: "contributionType", type: "uint256" },
      { name: "weight", type: "uint256" },
      { name: "metadataURI", type: "string" },
    ],
    name: "mintContribution",
    outputs: [{ name: "tokenId", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ name: "user", type: "address" }],
    name: "getUserContributions",
    outputs: [{ name: "", type: "uint256[]" }],
    stateMutability: "view",
    type: "function",
  },
] as const

// Contribution types
export const CONTRIBUTION_TYPES = {
  WRITING: 1n,
  ILLUSTRATION: 2n,
  EDITING: 3n,
  NARRATION: 4n,
} as const

// Staking contract ABI
export const STAKING_CONTRACT_ABI = [
  {
    inputs: [
      { name: "storyId", type: "uint256" },
      { name: "amount", type: "uint256" },
    ],
    name: "stake",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { name: "storyId", type: "uint256" },
      { name: "amount", type: "uint256" },
    ],
    name: "unstake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ name: "storyId", type: "uint256" }],
    name: "claimRewards",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { name: "user", type: "address" },
      { name: "storyId", type: "uint256" },
    ],
    name: "getStakeInfo",
    outputs: [
      { name: "amount", type: "uint256" },
      { name: "rewards", type: "uint256" },
      { name: "lockTime", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const
