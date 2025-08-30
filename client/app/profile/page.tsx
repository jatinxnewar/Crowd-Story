"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Coins, BookOpen, Edit, Palette, Mic, Star, Calendar, ExternalLink, Copy, Settings } from "lucide-react"
import { useAccount } from "wagmi"
import Link from "next/link"

// Mock user data
const userData = {
  address: "0x1234567890abcdef1234567890abcdef12345678",
  username: "QuantumWriter",
  bio: "Passionate storyteller exploring the intersection of science fiction and human emotion. Contributing to collaborative narratives on the blockchain.",
  joinDate: "2024-01-15",
  avatar: "/diverse-user-avatars.png",
  reputation: 847,
  level: "Veteran Contributor",
  totalEarnings: "5.7 ETH",
  claimableAmount: "0.34 ETH",
  storiesContributed: 12,
  chaptersWritten: 28,
  totalVotes: 1247,
}

const contributionBadges = [
  {
    id: 1,
    type: "Writing",
    tokenId: "001",
    story: "The Quantum Chronicles",
    chapter: "Chapter 1: The Discovery",
    weight: 100,
    earned: "0.15 ETH",
    date: "2024-01-16",
    icon: BookOpen,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    id: 2,
    type: "Writing",
    tokenId: "002",
    story: "Digital Hearts",
    chapter: "Chapter 5: Connection",
    weight: 85,
    earned: "0.12 ETH",
    date: "2024-02-03",
    icon: BookOpen,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    id: 3,
    type: "Editing",
    tokenId: "003",
    story: "Shadows of the Old Kingdom",
    chapter: "Chapter 3: The Quest Begins",
    weight: 60,
    earned: "0.08 ETH",
    date: "2024-02-15",
    icon: Edit,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    id: 4,
    type: "Illustration",
    tokenId: "004",
    story: "The Quantum Chronicles",
    chapter: "Cover Art",
    weight: 120,
    earned: "0.18 ETH",
    date: "2024-03-01",
    icon: Palette,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    id: 5,
    type: "Narration",
    tokenId: "005",
    story: "Digital Hearts",
    chapter: "Chapter 1-3 Audio",
    weight: 90,
    earned: "0.13 ETH",
    date: "2024-03-10",
    icon: Mic,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
]

const revenueHistory = [
  {
    id: 1,
    story: "The Quantum Chronicles",
    amount: "0.15 ETH",
    source: "E-book Sales",
    date: "2024-03-15",
    status: "Claimed",
  },
  {
    id: 2,
    story: "Digital Hearts",
    amount: "0.12 ETH",
    source: "Print Rights",
    date: "2024-03-10",
    status: "Claimed",
  },
  {
    id: 3,
    story: "Shadows of the Old Kingdom",
    amount: "0.08 ETH",
    source: "Streaming License",
    date: "2024-03-05",
    status: "Pending",
  },
  {
    id: 4,
    story: "The Quantum Chronicles",
    amount: "0.18 ETH",
    source: "Merchandise",
    date: "2024-02-28",
    status: "Claimed",
  },
]

const contributionStats = {
  writing: { count: 15, percentage: 45 },
  editing: { count: 8, percentage: 24 },
  illustration: { count: 6, percentage: 18 },
  narration: { count: 4, percentage: 13 },
}

export default function ProfilePage() {
  const { address, isConnected } = useAccount()
  const [activeTab, setActiveTab] = useState("overview")

  const handleClaimRevenue = () => {
    console.log("[v0] Claiming revenue:", userData.claimableAmount)
    alert("Revenue claimed successfully! (This is a demo)")
  }

  const copyAddress = () => {
    navigator.clipboard.writeText(userData.address)
    alert("Address copied to clipboard!")
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-16 text-center">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle>Connect Wallet Required</CardTitle>
              <CardDescription>You need to connect your wallet to view your profile.</CardDescription>
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
        {/* Profile Header */}
        <div className="mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="flex-shrink-0">
                  <img
                    src={userData.avatar || "/placeholder.svg"}
                    alt="Profile"
                    className="w-24 h-24 rounded-full border-4 border-primary/20"
                  />
                </div>

                <div className="flex-1 space-y-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="font-serif text-3xl font-bold">{userData.username}</h1>
                      <Badge variant="secondary">{userData.level}</Badge>
                    </div>
                    <p className="text-muted-foreground mb-3">{userData.bio}</p>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Joined {userData.joinDate}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4" />
                        <span>{userData.reputation} reputation</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <code className="px-2 py-1 bg-muted rounded text-sm font-mono">
                      {userData.address.slice(0, 10)}...{userData.address.slice(-8)}
                    </code>
                    <Button variant="outline" size="sm" onClick={copyAddress}>
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/settings">
                        <Settings className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>

                <div className="flex-shrink-0">
                  <Card className="text-center p-4">
                    <div className="text-2xl font-bold text-primary mb-1">{userData.totalEarnings}</div>
                    <div className="text-sm text-muted-foreground">Total Earned</div>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{userData.storiesContributed}</div>
              <div className="text-sm text-muted-foreground">Stories</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{userData.chaptersWritten}</div>
              <div className="text-sm text-muted-foreground">Chapters</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{contributionBadges.length}</div>
              <div className="text-sm text-muted-foreground">NFT Badges</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{userData.totalVotes}</div>
              <div className="text-sm text-muted-foreground">Votes Cast</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="badges">NFT Badges</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="contributions">Contributions</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Claimable Revenue */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Coins className="h-5 w-5" />
                    Claimable Revenue
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-primary mb-2">{userData.claimableAmount}</div>
                    <div className="text-sm text-muted-foreground">Available to claim</div>
                  </div>
                  <Button className="w-full" onClick={handleClaimRevenue}>
                    <Coins className="mr-2 h-4 w-4" />
                    Claim Revenue
                  </Button>
                </CardContent>
              </Card>

              {/* Contribution Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle>Contribution Types</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-blue-600" />
                        <span className="text-sm">Writing</span>
                      </div>
                      <span className="text-sm font-medium">{contributionStats.writing.count}</span>
                    </div>
                    <Progress value={contributionStats.writing.percentage} className="h-2" />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Edit className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Editing</span>
                      </div>
                      <span className="text-sm font-medium">{contributionStats.editing.count}</span>
                    </div>
                    <Progress value={contributionStats.editing.percentage} className="h-2" />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Palette className="h-4 w-4 text-purple-600" />
                        <span className="text-sm">Illustration</span>
                      </div>
                      <span className="text-sm font-medium">{contributionStats.illustration.count}</span>
                    </div>
                    <Progress value={contributionStats.illustration.percentage} className="h-2" />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Mic className="h-4 w-4 text-orange-600" />
                        <span className="text-sm">Narration</span>
                      </div>
                      <span className="text-sm font-medium">{contributionStats.narration.count}</span>
                    </div>
                    <Progress value={contributionStats.narration.percentage} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contributionBadges.slice(0, 3).map((badge) => {
                    const Icon = badge.icon
                    return (
                      <div key={badge.id} className="flex items-center gap-4 p-3 border rounded-lg">
                        <div className={`p-2 rounded-lg ${badge.bgColor}`}>
                          <Icon className={`h-5 w-5 ${badge.color}`} />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{badge.type} contribution</div>
                          <div className="text-sm text-muted-foreground">
                            {badge.story} - {badge.chapter}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{badge.earned}</div>
                          <div className="text-xs text-muted-foreground">{badge.date}</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* NFT Badges Tab */}
          <TabsContent value="badges" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl font-bold">NFT Contribution Badges</h2>
              <Badge variant="outline">{contributionBadges.length} badges earned</Badge>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {contributionBadges.map((badge) => {
                const Icon = badge.icon
                return (
                  <Card key={badge.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 rounded-lg ${badge.bgColor}`}>
                          <Icon className={`h-6 w-6 ${badge.color}`} />
                        </div>
                        <Badge variant="outline">#{badge.tokenId}</Badge>
                      </div>

                      <div className="space-y-2">
                        <h3 className="font-semibold">{badge.type} Badge</h3>
                        <p className="text-sm text-muted-foreground">{badge.story}</p>
                        <p className="text-xs text-muted-foreground">{badge.chapter}</p>

                        <Separator />

                        <div className="flex items-center justify-between text-sm">
                          <span>Weight: {badge.weight}</span>
                          <span className="font-medium text-primary">{badge.earned}</span>
                        </div>

                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{badge.date}</span>
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          {/* Revenue Tab */}
          <TabsContent value="revenue" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-primary mb-2">{userData.totalEarnings}</div>
                  <div className="text-sm text-muted-foreground">Total Earned</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">{userData.claimableAmount}</div>
                  <div className="text-sm text-muted-foreground">Claimable</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {(Number.parseFloat(userData.totalEarnings) - Number.parseFloat(userData.claimableAmount)).toFixed(
                      2,
                    )}{" "}
                    ETH
                  </div>
                  <div className="text-sm text-muted-foreground">Already Claimed</div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Revenue History</CardTitle>
                  <Button onClick={handleClaimRevenue}>
                    <Coins className="mr-2 h-4 w-4" />
                    Claim Available
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {revenueHistory.map((revenue) => (
                    <div key={revenue.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-medium">{revenue.story}</div>
                        <div className="text-sm text-muted-foreground">{revenue.source}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{revenue.amount}</div>
                        <div className="text-xs text-muted-foreground">{revenue.date}</div>
                      </div>
                      <Badge variant={revenue.status === "Claimed" ? "default" : "secondary"}>{revenue.status}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contributions Tab */}
          <TabsContent value="contributions" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl font-bold">My Contributions</h2>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{userData.chaptersWritten} chapters</Badge>
                <Badge variant="outline">{userData.storiesContributed} stories</Badge>
              </div>
            </div>

            <div className="space-y-4">
              {contributionBadges.map((contribution) => {
                const Icon = contribution.icon
                return (
                  <Card key={contribution.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-lg ${contribution.bgColor}`}>
                          <Icon className={`h-6 w-6 ${contribution.color}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold">{contribution.chapter}</h3>
                            <Badge variant="outline">{contribution.type}</Badge>
                          </div>
                          <p className="text-muted-foreground mb-3">{contribution.story}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>Weight: {contribution.weight}</span>
                            <span>•</span>
                            <span>Earned: {contribution.earned}</span>
                            <span>•</span>
                            <span>{contribution.date}</span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
