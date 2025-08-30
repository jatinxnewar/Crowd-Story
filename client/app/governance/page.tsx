"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Vote, Clock, CheckCircle, XCircle, AlertCircle, Coins } from "lucide-react"
import { useAccount } from "wagmi"

// Mock governance data
const activeProposals = [
  {
    id: 1,
    title: "Reduce Platform Fee from 5% to 3%",
    description: "Proposal to reduce the platform fee to make StoryDAO more competitive and increase creator earnings.",
    proposer: "0x1234...5678",
    status: "Active",
    votesFor: 1247,
    votesAgainst: 342,
    totalVotes: 1589,
    quorum: 2000,
    timeLeft: "3 days, 14 hours",
    category: "Economic",
  },
  {
    id: 2,
    title: "Add New Contribution Type: Audio Narration",
    description: "Introduce audio narration as a new contribution type with weighted rewards and voting power.",
    proposer: "0x5678...9012",
    status: "Active",
    votesFor: 892,
    votesAgainst: 156,
    totalVotes: 1048,
    quorum: 1500,
    timeLeft: "1 day, 8 hours",
    category: "Feature",
  },
  {
    id: 3,
    title: "Implement Story Quality Standards",
    description: "Establish minimum quality standards for story submissions to maintain platform reputation.",
    proposer: "0x9012...3456",
    status: "Pending",
    votesFor: 234,
    votesAgainst: 89,
    totalVotes: 323,
    quorum: 1000,
    timeLeft: "6 days, 12 hours",
    category: "Governance",
  },
]

const completedProposals = [
  {
    id: 4,
    title: "Enable Story Branching Feature",
    description: "Allow stories to have alternative branches voted on by the community.",
    result: "Passed",
    votesFor: 2156,
    votesAgainst: 445,
    implementationDate: "2024-01-15",
  },
  {
    id: 5,
    title: "Increase Voting Period to 7 Days",
    description: "Extend the voting period for story proposals from 5 to 7 days.",
    result: "Passed",
    votesFor: 1834,
    votesAgainst: 267,
    implementationDate: "2024-01-10",
  },
]

const governanceStats = {
  totalProposals: 47,
  activeProposals: 3,
  totalVoters: 2847,
  treasuryBalance: "1,247.8 ETH",
  votingPower: 156,
}

export default function GovernancePage() {
  const { address, isConnected } = useAccount()
  const [activeTab, setActiveTab] = useState("proposals")
  const [selectedProposal, setSelectedProposal] = useState<number | null>(null)

  const handleVote = (proposalId: number, vote: "for" | "against") => {
    console.log("[v0] Voting on proposal:", { proposalId, vote })
    alert(`Voted ${vote} on proposal ${proposalId}!`)
  }

  const handleCreateProposal = () => {
    console.log("[v0] Creating new proposal")
    alert("Proposal creation feature coming soon!")
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-16 text-center">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle>Connect Wallet Required</CardTitle>
              <CardDescription>You need to connect your wallet to participate in governance.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Please use the "Connect Wallet" button in the navigation to get started.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-serif text-3xl font-bold mb-2">Platform Governance</h1>
            <p className="text-muted-foreground">
              Participate in shaping the future of StoryDAO through community proposals and voting
            </p>
          </div>

          {/* Governance Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">{governanceStats.totalProposals}</div>
                <div className="text-sm text-muted-foreground">Total Proposals</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">{governanceStats.activeProposals}</div>
                <div className="text-sm text-muted-foreground">Active Proposals</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">{governanceStats.totalVoters}</div>
                <div className="text-sm text-muted-foreground">Total Voters</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">{governanceStats.treasuryBalance}</div>
                <div className="text-sm text-muted-foreground">Treasury</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">{governanceStats.votingPower}</div>
                <div className="text-sm text-muted-foreground">Your Voting Power</div>
              </CardContent>
            </Card>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="proposals">Active Proposals</TabsTrigger>
              <TabsTrigger value="history">Proposal History</TabsTrigger>
              <TabsTrigger value="treasury">Treasury</TabsTrigger>
            </TabsList>

            {/* Active Proposals Tab */}
            <TabsContent value="proposals" className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-2xl font-bold">Active Proposals</h2>
                <Button onClick={handleCreateProposal}>
                  <Vote className="mr-2 h-4 w-4" />
                  Create Proposal
                </Button>
              </div>

              <div className="space-y-6">
                {activeProposals.map((proposal) => (
                  <Card key={proposal.id} className="overflow-hidden">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <CardTitle className="text-xl">{proposal.title}</CardTitle>
                            <Badge variant={proposal.status === "Active" ? "default" : "secondary"}>
                              {proposal.status}
                            </Badge>
                            <Badge variant="outline">{proposal.category}</Badge>
                          </div>
                          <CardDescription className="mb-4">{proposal.description}</CardDescription>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>Proposed by {proposal.proposer}</span>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{proposal.timeLeft} remaining</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Voting Progress */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span>Votes For: {proposal.votesFor}</span>
                          <span>Votes Against: {proposal.votesAgainst}</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Support: {((proposal.votesFor / proposal.totalVotes) * 100).toFixed(1)}%</span>
                            <span>
                              Quorum: {proposal.totalVotes}/{proposal.quorum}
                            </span>
                          </div>
                          <Progress value={(proposal.votesFor / proposal.totalVotes) * 100} className="h-2" />
                          <Progress value={(proposal.totalVotes / proposal.quorum) * 100} className="h-1" />
                        </div>
                      </div>

                      <Separator />

                      {/* Voting Buttons */}
                      <div className="flex items-center gap-4">
                        <Button onClick={() => handleVote(proposal.id, "for")} className="flex-1" variant="default">
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Vote For
                        </Button>
                        <Button onClick={() => handleVote(proposal.id, "against")} className="flex-1" variant="outline">
                          <XCircle className="mr-2 h-4 w-4" />
                          Vote Against
                        </Button>
                      </div>

                      {/* Quorum Warning */}
                      {proposal.totalVotes < proposal.quorum && (
                        <div className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <AlertCircle className="h-4 w-4 text-yellow-600" />
                          <p className="text-sm text-yellow-800">
                            Quorum not yet reached. {proposal.quorum - proposal.totalVotes} more votes needed.
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Proposal History Tab */}
            <TabsContent value="history" className="space-y-6">
              <h2 className="font-serif text-2xl font-bold">Proposal History</h2>

              <div className="space-y-4">
                {completedProposals.map((proposal) => (
                  <Card key={proposal.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{proposal.title}</CardTitle>
                          <CardDescription>{proposal.description}</CardDescription>
                        </div>
                        <Badge variant={proposal.result === "Passed" ? "default" : "destructive"}>
                          {proposal.result}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Votes For:</span>
                          <p className="font-semibold text-green-600">{proposal.votesFor}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Votes Against:</span>
                          <p className="font-semibold text-red-600">{proposal.votesAgainst}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Implemented:</span>
                          <p className="font-semibold">{proposal.implementationDate}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Treasury Tab */}
            <TabsContent value="treasury" className="space-y-6">
              <h2 className="font-serif text-2xl font-bold">DAO Treasury</h2>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Treasury Balance</CardTitle>
                    <CardDescription>Total funds available for platform development</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-primary mb-2">{governanceStats.treasuryBalance}</div>
                      <div className="text-sm text-muted-foreground">Current Balance</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Revenue Sources</CardTitle>
                    <CardDescription>How treasury funds are generated</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Platform Fees (5%)</span>
                      <span className="text-sm font-semibold">892.3 ETH</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">NFT Marketplace (2.5%)</span>
                      <span className="text-sm font-semibold">234.7 ETH</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Staking Rewards</span>
                      <span className="text-sm font-semibold">120.8 ETH</span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between font-semibold">
                      <span>Total</span>
                      <span>{governanceStats.treasuryBalance}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Treasury Allocation Proposals</CardTitle>
                  <CardDescription>Upcoming proposals for treasury fund usage</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    <Coins className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No active treasury proposals</p>
                    <p className="text-sm">Treasury allocation proposals will appear here</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
