"use client"

import { useReadContract, useWriteContract, useWaitForTransactionReceipt, useAccount } from "wagmi"
import {
  CONTRACT_ADDRESSES,
  STORY_FACTORY_ABI,
  STORY_REGISTRY_ABI,
  CONTRIBUTION_NFT_ABI,
  STAKING_CONTRACT_ABI,
} from "@/lib/contracts"

export function useStoryFactory() {
  const { isConnected } = useAccount()
  const { writeContract, data: hash, isPending, error } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
    query: { enabled: !!hash && isConnected },
  })

  const createStory = async (config: {
    owner: string
    metadataURI: string
    rulesHash: string
    initialContributors: string[]
    initialSplits: bigint[]
  }) => {
    if (!isConnected) {
      throw new Error("Wallet not connected")
    }
    return writeContract({
      address: CONTRACT_ADDRESSES.STORY_FACTORY,
      abi: STORY_FACTORY_ABI,
      functionName: "createStory",
      args: [config],
    })
  }

  return {
    createStory,
    isPending,
    isConfirming,
    isSuccess,
    error,
    hash,
    isConnected,
  }
}

export function useStoryRegistry() {
  const { isConnected } = useAccount()

  const storyRegistryContract = useReadContract({
    address: CONTRACT_ADDRESSES.STORY_REGISTRY,
    abi: STORY_REGISTRY_ABI,
    functionName: "getStory",
    query: { enabled: isConnected },
  })

  const getStory = (storyId: bigint) => {
    if (!isConnected) return null
    return storyRegistryContract({ args: [storyId] })
  }

  return { getStory, isConnected }
}

export function useContributionNFT() {
  const { isConnected } = useAccount()
  const { writeContract, data: hash, isPending, error } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
    query: { enabled: !!hash && isConnected },
  })

  const contributionNFTContract = useReadContract({
    address: CONTRACT_ADDRESSES.CONTRIBUTION_NFT,
    abi: CONTRIBUTION_NFT_ABI,
    functionName: "getUserContributions",
    query: { enabled: isConnected },
  })

  const mintContribution = async (params: {
    to: string
    storyId: bigint
    chapterId: bigint
    contributionType: bigint
    weight: bigint
    metadataURI: string
  }) => {
    if (!isConnected) {
      throw new Error("Wallet not connected")
    }
    return writeContract({
      address: CONTRACT_ADDRESSES.CONTRIBUTION_NFT,
      abi: CONTRIBUTION_NFT_ABI,
      functionName: "mintContribution",
      args: [params.to, params.storyId, params.chapterId, params.contributionType, params.weight, params.metadataURI],
    })
  }

  const getUserContributions = (userAddress: string) => {
    if (!isConnected) return null
    return contributionNFTContract({ args: [userAddress] })
  }

  return {
    mintContribution,
    getUserContributions,
    isPending,
    isConfirming,
    isSuccess,
    error,
    hash,
    isConnected,
  }
}

export function useStaking() {
  const { isConnected } = useAccount()
  const { writeContract, data: hash, isPending, error } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
    query: { enabled: !!hash && isConnected },
  })

  const stakingContract = useReadContract({
    address: CONTRACT_ADDRESSES.STAKING_CONTRACT,
    abi: STAKING_CONTRACT_ABI,
    functionName: "getStakeInfo",
    query: { enabled: isConnected },
  })

  const stake = async (storyId: bigint, amount: bigint) => {
    if (!isConnected) {
      throw new Error("Wallet not connected")
    }
    return writeContract({
      address: CONTRACT_ADDRESSES.STAKING_CONTRACT,
      abi: STAKING_CONTRACT_ABI,
      functionName: "stake",
      args: [storyId, amount],
      value: amount, // Send ETH with the transaction
    })
  }

  const unstake = async (storyId: bigint, amount: bigint) => {
    if (!isConnected) {
      throw new Error("Wallet not connected")
    }
    return writeContract({
      address: CONTRACT_ADDRESSES.STAKING_CONTRACT,
      abi: STAKING_CONTRACT_ABI,
      functionName: "unstake",
      args: [storyId, amount],
    })
  }

  const claimRewards = async (storyId: bigint) => {
    if (!isConnected) {
      throw new Error("Wallet not connected")
    }
    return writeContract({
      address: CONTRACT_ADDRESSES.STAKING_CONTRACT,
      abi: STAKING_CONTRACT_ABI,
      functionName: "claimRewards",
      args: [storyId],
    })
  }

  const getStakeInfo = (userAddress: string, storyId: bigint) => {
    if (!isConnected) return null
    return stakingContract({ args: [userAddress, storyId] })
  }

  return {
    stake,
    unstake,
    claimRewards,
    getStakeInfo,
    isPending,
    isConfirming,
    isSuccess,
    error,
    hash,
    isConnected,
  }
}
