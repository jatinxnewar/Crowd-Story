import { keccak256, toBytes } from "viem"

export interface StoryMetadata {
  title: string
  description: string
  genre: string
  coverImage?: string
  tags: string[]
  language: string
  contentRating: "G" | "PG" | "PG-13" | "R" | "NC-17"
}

export interface StoryRules {
  votingPeriod: number // in days
  quorumPercentage: number // 0-100
  contributionWeights: {
    writing: number
    illustration: number
    editing: number
    narration: number
  }
  revenueSplitRules: {
    authorShare: number // percentage
    contributorShare: number // percentage
    platformFee: number // percentage
  }
}

export function generateRulesHash(rules: StoryRules): `0x${string}` {
  const rulesString = JSON.stringify(rules, Object.keys(rules).sort())
  return keccak256(toBytes(rulesString))
}

export function validateStoryConfig(
  metadata: StoryMetadata,
  rules: StoryRules,
  initialContributors: string[],
  initialSplits: number[],
): { isValid: boolean; errors: string[] } {
  const errors: string[] = []

  // Validate metadata
  if (!metadata.title.trim()) errors.push("Title is required")
  if (!metadata.description.trim()) errors.push("Description is required")
  if (!metadata.genre.trim()) errors.push("Genre is required")

  // Validate rules
  if (rules.votingPeriod < 1 || rules.votingPeriod > 30) {
    errors.push("Voting period must be between 1 and 30 days")
  }
  if (rules.quorumPercentage < 1 || rules.quorumPercentage > 100) {
    errors.push("Quorum percentage must be between 1 and 100")
  }

  // Validate revenue splits sum to 100%
  const totalRevenue =
    rules.revenueSplitRules.authorShare + rules.revenueSplitRules.contributorShare + rules.revenueSplitRules.platformFee
  if (totalRevenue !== 100) {
    errors.push("Revenue split percentages must sum to 100%")
  }

  // Validate initial contributor splits
  if (initialContributors.length !== initialSplits.length) {
    errors.push("Initial contributors and splits arrays must have the same length")
  }

  const totalSplits = initialSplits.reduce((sum, split) => sum + split, 0)
  if (totalSplits !== 10000) {
    // 10000 basis points = 100%
    errors.push("Initial splits must sum to 10000 basis points (100%)")
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

export function formatContributionType(type: bigint): string {
  switch (type) {
    case 1n:
      return "Writing"
    case 2n:
      return "Illustration"
    case 3n:
      return "Editing"
    case 4n:
      return "Narration"
    default:
      return "Unknown"
  }
}

export function parseStoryMetadata(metadataURI: string): Promise<StoryMetadata> {
  // In a real implementation, this would fetch from IPFS or another storage service
  // For now, we'll return a mock implementation
  return Promise.resolve({
    title: "Sample Story",
    description: "A sample story description",
    genre: "Fantasy",
    tags: ["adventure", "magic"],
    language: "en",
    contentRating: "PG-13",
  })
}
