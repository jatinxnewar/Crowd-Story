"use client"

import { useState } from "react"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, XCircle, GitMerge, GitBranch, Vote } from "lucide-react"

interface VotingWidgetProps {
  proposal: {
    id: number
    votes: {
      approve: number
      reject: number
      merge: number
      branch: number
    }
    totalVoters: number
    quorumMet: boolean
  }
  onVote: (choice: "approve" | "reject" | "merge" | "branch") => void
}

export function VotingWidget({ proposal, onVote }: VotingWidgetProps) {
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null)
  const [hasVoted, setHasVoted] = useState(false)

  const totalVotes = Object.values(proposal.votes).reduce((sum, count) => sum + count, 0)

  const voteOptions = [
    {
      key: "approve" as const,
      label: "Approve",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50 hover:bg-green-100",
      borderColor: "border-green-200",
      count: proposal.votes.approve,
      description: "Accept this chapter as canon",
    },
    {
      key: "reject" as const,
      label: "Reject",
      icon: XCircle,
      color: "text-red-600",
      bgColor: "bg-red-50 hover:bg-red-100",
      borderColor: "border-red-200",
      count: proposal.votes.reject,
      description: "Reject this proposal",
    },
    {
      key: "merge" as const,
      label: "Merge with Edits",
      icon: GitMerge,
      color: "text-blue-600",
      bgColor: "bg-blue-50 hover:bg-blue-100",
      borderColor: "border-blue-200",
      count: proposal.votes.merge,
      description: "Accept with suggested changes",
    },
    {
      key: "branch" as const,
      label: "Create Branch",
      icon: GitBranch,
      color: "text-purple-600",
      bgColor: "bg-purple-50 hover:bg-purple-100",
      borderColor: "border-purple-200",
      count: proposal.votes.branch,
      description: "Create alternative storyline",
    },
  ]

  const handleVote = (choice: "approve" | "reject" | "merge" | "branch") => {
    if (hasVoted) return

    setSelectedChoice(choice)
    setHasVoted(true)
    onVote(choice)
  }

  return (
    <div className="space-y-4">
      {/* Voting Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {voteOptions.map((option) => {
          const Icon = option.icon
          const percentage = totalVotes > 0 ? (option.count / totalVotes) * 100 : 0
          const isSelected = selectedChoice === option.key

          return (
            <Card
              key={option.key}
              className={`cursor-pointer transition-all ${
                hasVoted
                  ? isSelected
                    ? `${option.borderColor} border-2`
                    : "opacity-60"
                  : `hover:shadow-md ${option.bgColor}`
              }`}
              onClick={() => !hasVoted && handleVote(option.key)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Icon className={`h-5 w-5 ${option.color}`} />
                    <span className="font-medium">{option.label}</span>
                    {isSelected && hasVoted && (
                      <Badge variant="default" className="text-xs">
                        Voted
                      </Badge>
                    )}
                  </div>
                  <span className="text-sm font-medium">{option.count}</span>
                </div>

                <p className="text-xs text-muted-foreground mb-3">{option.description}</p>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>{percentage.toFixed(1)}%</span>
                    <span>{option.count} votes</span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Voting Summary */}
      <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Vote className="h-4 w-4" />
            <span className="text-sm font-medium">{totalVotes} total votes</span>
          </div>
          <Badge variant={proposal.quorumMet ? "default" : "secondary"}>
            {proposal.quorumMet ? "Quorum Met" : "Quorum Needed"}
          </Badge>
        </div>

        {!hasVoted && <p className="text-xs text-muted-foreground">Click an option to cast your vote</p>}
      </div>

      {hasVoted && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-800">
            ✓ Your vote has been recorded on-chain. You can view the transaction in your wallet.
          </p>
        </div>
      )}
    </div>
  )
}
