"use client"

import { Label } from "@/components/ui/label"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Vote,
  Coins,
  Clock,
  Star,
  Eye,
  MessageCircle,
  PlusCircle,
  Edit,
  Flag,
  Share,
  Heart,
  GitBranch,
} from "lucide-react"
import Link from "next/link"
import { VotingWidget } from "@/components/voting-widget"
import { BranchMap } from "@/components/branch-map"

// Mock data for story
const storyData = {
  id: 1,
  title: "The Quantum Chronicles",
  description:
    "A sci-fi epic about interdimensional travel and the consequences of altering reality. Follow Dr. Elena Vasquez as she discovers a way to traverse parallel universes, only to find that each jump creates ripples that threaten the fabric of existence itself.",
  author: "0x1234...5678",
  authorName: "QuantumWriter",
  genre: "Sci-Fi",
  tags: ["Time Travel", "Parallel Universes", "Science", "Adventure"],
  status: "Active",
  chapters: 12,
  contributors: 8,
  totalVotes: 1247,
  revenue: "2.4 ETH",
  followers: 342,
  createdAt: "2024-01-15",
  loreBible:
    "In the year 2157, quantum physics has advanced to the point where interdimensional travel is theoretically possible. The story takes place across multiple Earth variants, each with subtle but significant differences...",
  rules:
    "All chapters must maintain scientific plausibility. Character deaths require community vote. Major plot changes need 75% approval.",
  isPublic: true,
  votingDuration: 7,
  quorum: 100,
}

const chapters = [
  {
    id: 1,
    title: "The Discovery",
    content:
      "Dr. Elena Vasquez stared at the quantum resonance readings, her heart racing. After three years of theoretical work, the impossible had become possible...",
    author: "0x1234...5678",
    authorName: "QuantumWriter",
    votes: 156,
    isCanon: true,
    timestamp: "2024-01-16",
    wordCount: 2847,
  },
  {
    id: 2,
    title: "First Jump",
    content:
      "The laboratory hummed with energy as Elena activated the quantum field generator. Reality shimmered around her like heat waves...",
    author: "0x5678...9012",
    authorName: "SciFiMaster",
    votes: 203,
    isCanon: true,
    timestamp: "2024-01-23",
    wordCount: 3156,
  },
]

const activeProposals = [
  {
    id: 1,
    title: "Chapter 13: The Paradox Unfolds",
    author: "0x9012...3456",
    authorName: "TimeWriter",
    description:
      "Elena discovers that her jumps have created a temporal paradox that threatens to unravel reality itself.",
    votes: { approve: 45, reject: 12, merge: 8, branch: 3 },
    timeLeft: "2 days, 14 hours",
    totalVoters: 68,
    quorumMet: false,
  },
  {
    id: 2,
    title: "Chapter 13: Alternative - The Mirror World",
    author: "0x3456...7890",
    authorName: "ParallelThinker",
    description:
      "Instead of a paradox, Elena finds herself trapped in a mirror dimension where everything is reversed.",
    votes: { approve: 32, reject: 18, merge: 15, branch: 7 },
    timeLeft: "1 day, 8 hours",
    totalVoters: 72,
    quorumMet: false,
  },
]

export default function StoryDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("overview")
  const [isFollowing, setIsFollowing] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Story Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{storyData.genre}</Badge>
                <Badge variant={storyData.status === "Active" ? "default" : "outline"}>{storyData.status}</Badge>
              </div>
              <h1 className="font-serif text-4xl font-bold mb-2">{storyData.title}</h1>
              <p className="text-lg text-muted-foreground mb-4">{storyData.description}</p>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>Created by {storyData.authorName}</span>
                <span>•</span>
                <span>{storyData.createdAt}</span>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  <span>{storyData.followers} followers</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant={isFollowing ? "default" : "outline"} onClick={() => setIsFollowing(!isFollowing)}>
                <Heart className={`mr-2 h-4 w-4 ${isFollowing ? "fill-current" : ""}`} />
                {isFollowing ? "Following" : "Follow"}
              </Button>
              <Button variant="outline" size="sm">
                <Share className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Flag className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Story Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">{storyData.chapters}</div>
                <div className="text-sm text-muted-foreground">Chapters</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">{storyData.contributors}</div>
                <div className="text-sm text-muted-foreground">Contributors</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">{storyData.totalVotes}</div>
                <div className="text-sm text-muted-foreground">Total Votes</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">{storyData.revenue}</div>
                <div className="text-sm text-muted-foreground">Revenue</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">{storyData.followers}</div>
                <div className="text-sm text-muted-foreground">Followers</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="chapters">Chapters</TabsTrigger>
            <TabsTrigger value="proposals">Proposals</TabsTrigger>
            <TabsTrigger value="branches">Branch Map</TabsTrigger>
            <TabsTrigger value="governance">Governance</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                {/* Lore Bible */}
                <Card>
                  <CardHeader>
                    <CardTitle>Lore Bible</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{storyData.loreBible}</p>
                  </CardContent>
                </Card>

                {/* Recent Chapters */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Recent Chapters</CardTitle>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/story/${storyData.id}/propose`}>
                          <PlusCircle className="mr-2 h-4 w-4" />
                          Propose Chapter
                        </Link>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {chapters.slice(0, 3).map((chapter) => (
                      <div key={chapter.id} className="border-l-4 border-primary pl-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">{chapter.title}</h4>
                          <Badge variant="outline">{chapter.wordCount} words</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{chapter.content.substring(0, 150)}...</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>by {chapter.authorName}</span>
                          <span>•</span>
                          <span>{chapter.timestamp}</span>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3" />
                            <span>{chapter.votes} votes</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                {/* Story Rules */}
                <Card>
                  <CardHeader>
                    <CardTitle>Story Rules</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{storyData.rules}</p>
                  </CardContent>
                </Card>

                {/* Tags */}
                <Card>
                  <CardHeader>
                    <CardTitle>Tags</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {storyData.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Active Proposals Preview */}
                <Card>
                  <CardHeader>
                    <CardTitle>Active Proposals</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {activeProposals.slice(0, 2).map((proposal) => (
                      <div key={proposal.id} className="p-3 border rounded-lg">
                        <h5 className="font-medium text-sm mb-1">{proposal.title}</h5>
                        <p className="text-xs text-muted-foreground mb-2">by {proposal.authorName}</p>
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{proposal.timeLeft}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Vote className="h-3 w-3" />
                            <span>{proposal.totalVoters} votes</span>
                          </div>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      View All Proposals
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Chapters Tab */}
          <TabsContent value="chapters" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl font-bold">Story Chapters</h2>
              <Button asChild>
                <Link href={`/story/${storyData.id}/propose`}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Propose Chapter
                </Link>
              </Button>
            </div>

            <div className="space-y-4">
              {chapters.map((chapter) => (
                <Card key={chapter.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          Chapter {chapter.id}: {chapter.title}
                          {chapter.isCanon && <Badge variant="default">Canon</Badge>}
                        </CardTitle>
                        <CardDescription>
                          by {chapter.authorName} • {chapter.timestamp} • {chapter.wordCount} words
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Star className="h-4 w-4" />
                          <span>{chapter.votes}</span>
                        </div>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{chapter.content}</p>
                    <div className="flex items-center gap-4">
                      <Button variant="outline" size="sm">
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Discuss
                      </Button>
                      <Button variant="outline" size="sm">
                        <GitBranch className="mr-2 h-4 w-4" />
                        Create Branch
                      </Button>
                      <Button variant="outline" size="sm">
                        <Flag className="mr-2 h-4 w-4" />
                        Report
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Proposals Tab */}
          <TabsContent value="proposals" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl font-bold">Active Proposals</h2>
              <Button asChild>
                <Link href={`/story/${storyData.id}/propose`}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  New Proposal
                </Link>
              </Button>
            </div>

            <div className="space-y-6">
              {activeProposals.map((proposal) => (
                <Card key={proposal.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>{proposal.title}</CardTitle>
                        <CardDescription>Proposed by {proposal.authorName}</CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{proposal.timeLeft} remaining</div>
                        <div className="text-xs text-muted-foreground">
                          {proposal.totalVoters} / {storyData.quorum} votes
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{proposal.description}</p>

                    <VotingWidget proposal={proposal} onVote={(choice) => console.log("[v0] Voted:", choice)} />
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Branch Map Tab */}
          <TabsContent value="branches">
            <BranchMap storyId={storyData.id} />
          </TabsContent>

          {/* Governance Tab */}
          <TabsContent value="governance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Governance Settings</CardTitle>
                <CardDescription>Current governance parameters for this story</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Voting Duration</Label>
                    <p className="text-2xl font-bold">{storyData.votingDuration} days</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Minimum Quorum</Label>
                    <p className="text-2xl font-bold">{storyData.quorum} votes</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <Label className="text-sm font-medium">Story Visibility</Label>
                  <p className="text-lg">{storyData.isPublic ? "Public" : "Private"}</p>
                  <p className="text-sm text-muted-foreground">
                    {storyData.isPublic
                      ? "Anyone can read and propose chapters"
                      : "Only invited contributors can participate"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Revenue Tab */}
          <TabsContent value="revenue" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
                <CardDescription>Total earnings and distribution for this story</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-primary mb-2">{storyData.revenue}</div>
                  <div className="text-muted-foreground">Total Revenue Generated</div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Available to Claim</span>
                      <span>0.24 ETH</span>
                    </div>
                    <Progress value={10} className="h-2" />
                  </div>

                  <Button className="w-full">
                    <Coins className="mr-2 h-4 w-4" />
                    Claim Revenue
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
