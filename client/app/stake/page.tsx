"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Coins, TrendingUp, Lock, Clock, Star, BookOpen, Users, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { useAccount, useBalance } from "wagmi"
import Link from "next/link"

// Mock staking data
const stakingPools = [
  {
    id: 1,
    storyTitle: "The Quantum Chronicles",
    storyId: "1",
    totalStaked: "156.7 ETH",
    apy: 12.5,
    myStake: "2.4 ETH",
    rewards: "0.15 ETH",
    status: "Active",
    lockPeriod: "30 days",
    contributors: 24,
    chapters: 12,
  },
  {
    id: 2,
    storyTitle: "Shadows of the Old Kingdom",
    storyId: "2",
    totalStaked: "89.3 ETH",
    apy: 15.2,
    myStake: "0 ETH",
    rewards: "0 ETH",
    status: "Active",
    lockPeriod: "60 days",
    contributors: 18,
    chapters: 8,
  },
  {
    id: 3,
    storyTitle: "Digital Hearts",
    storyId: "3",
    totalStaked: "234.1 ETH",
    apy: 8.7,
    myStake: "1.2 ETH",
    rewards: "0.08 ETH",
    status: "Completed",
    lockPeriod: "90 days",
    contributors: 31,
    chapters: 15,
  },
]

const stakingHistory = [
  {
    id: 1,
    action: "Stake",
    story: "The Quantum Chronicles",
    amount: "2.4 ETH",
    timestamp: "2024-01-15 14:30",
    status: "Confirmed",
  },
  {
    id: 2,
    action: "Reward",
    story: "Digital Hearts",
    amount: "0.08 ETH",
    timestamp: "2024-01-10 09:15",
    status: "Claimed",
  },
  {
    id: 3,
    action: "Unstake",
    story: "Cyberpunk Tales",
    amount: "1.5 ETH",
    timestamp: "2024-01-05 16:45",
    status: "Confirmed",
  },
]

export default function StakePage() {
  const { address, isConnected } = useAccount()
  const { data: balance } = useBalance({ address })

  const [activeTab, setActiveTab] = useState("pools")
  const [selectedPool, setSelectedPool] = useState<number | null>(null)
  const [stakeAmount, setStakeAmount] = useState("")
  const [unstakeAmount, setUnstakeAmount] = useState("")
  const [isStaking, setIsStaking] = useState(false)
  const [isUnstaking, setIsUnstaking] = useState(false)

  // Calculate total portfolio values
  const totalStaked = stakingPools.reduce((sum, pool) => {
    return sum + Number.parseFloat(pool.myStake.replace(" ETH", ""))
  }, 0)

  const totalRewards = stakingPools.reduce((sum, pool) => {
    return sum + Number.parseFloat(pool.rewards.replace(" ETH", ""))
  }, 0)

  const handleStake = async (poolId: number) => {
    if (!stakeAmount) return

    setIsStaking(true)
    console.log("[v0] Staking:", { poolId, amount: stakeAmount })

    setTimeout(() => {
      if (isConnected) {
        alert(`Successfully staked ${stakeAmount} ETH!`)
      } else {
        alert(`Demo: Successfully staked ${stakeAmount} ETH! (Connect wallet for real transactions)`)
      }
      setStakeAmount("")
      setSelectedPool(null)
      setIsStaking(false)
    }, 2000)
  }

  const handleUnstake = async (poolId: number) => {
    if (!unstakeAmount) return

    setIsUnstaking(true)
    console.log("[v0] Unstaking:", { poolId, amount: unstakeAmount })

    setTimeout(() => {
      if (isConnected) {
        alert(`Successfully unstaked ${unstakeAmount} ETH!`)
      } else {
        alert(`Demo: Successfully unstaked ${unstakeAmount} ETH! (Connect wallet for real transactions)`)
      }
      setUnstakeAmount("")
      setSelectedPool(null)
      setIsUnstaking(false)
    }, 2000)
  }

  const handleClaimRewards = async (poolId: number) => {
    console.log("[v0] Claiming rewards for pool:", poolId)
    if (isConnected) {
      alert("Rewards claimed successfully!")
    } else {
      alert("Demo: Rewards claimed successfully! (Connect wallet for real transactions)")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-serif text-3xl font-bold mb-2">Story Staking</h1>
            <p className="text-muted-foreground">
              Stake ETH in story projects to earn rewards and support collaborative storytelling
            </p>
            {!isConnected && (
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>Demo Mode:</strong> You can explore the staking interface. Connect your wallet to make real
                  transactions on the blockchain.
                </p>
              </div>
            )}
          </div>

          {/* Portfolio Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Wallet Balance</p>
                    <p className="text-2xl font-bold">
                      {isConnected && balance
                        ? `${Number.parseFloat(balance.formatted).toFixed(4)} ${balance.symbol}`
                        : "5.2500 ETH"}
                    </p>
                  </div>
                  <Coins className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Staked</p>
                    <p className="text-2xl font-bold">{totalStaked.toFixed(4)} ETH</p>
                  </div>
                  <Lock className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Rewards</p>
                    <p className="text-2xl font-bold text-green-600">{totalRewards.toFixed(4)} ETH</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Stakes</p>
                    <p className="text-2xl font-bold">
                      {stakingPools.filter((p) => Number.parseFloat(p.myStake.replace(" ETH", "")) > 0).length}
                    </p>
                  </div>
                  <Star className="h-8 w-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="pools">Staking Pools</TabsTrigger>
              <TabsTrigger value="my-stakes">My Stakes</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>

            {/* Staking Pools Tab */}
            <TabsContent value="pools" className="space-y-6">
              <div className="grid gap-6">
                {stakingPools.map((pool) => (
                  <Card key={pool.id} className="overflow-hidden">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <CardTitle className="text-xl">
                              <Link href={`/story/${pool.storyId}`} className="hover:text-primary">
                                {pool.storyTitle}
                              </Link>
                            </CardTitle>
                            <Badge variant={pool.status === "Active" ? "default" : "secondary"}>{pool.status}</Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <BookOpen className="h-4 w-4" />
                              <span>{pool.chapters} chapters</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              <span>{pool.contributors} contributors</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{pool.lockPeriod} lock</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-600">{pool.apy}%</div>
                          <div className="text-sm text-muted-foreground">APY</div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {/* Stake Section */}
                        <div className="space-y-3">
                          <Label>Stake Amount (ETH)</Label>
                          <div className="flex gap-2">
                            <Input
                              type="number"
                              placeholder="0.0"
                              value={stakeAmount}
                              onChange={(e) => setStakeAmount(e.target.value)}
                              step="0.01"
                              min="0"
                            />
                            <Button
                              onClick={() => handleStake(pool.id)}
                              disabled={isStaking || !stakeAmount || Number.parseFloat(stakeAmount) <= 0}
                            >
                              {isStaking ? "Staking..." : isConnected ? "Stake" : "Stake (Demo)"}
                            </Button>
                          </div>
                        </div>

                        {/* Unstake Section */}
                        {Number.parseFloat(pool.myStake.replace(" ETH", "")) > 0 && (
                          <div className="space-y-3">
                            <Label>Unstake Amount (ETH)</Label>
                            <div className="flex gap-2">
                              <Input
                                type="number"
                                placeholder="0.0"
                                value={unstakeAmount}
                                onChange={(e) => setUnstakeAmount(e.target.value)}
                                step="0.01"
                                min="0"
                                max={Number.parseFloat(pool.myStake.replace(" ETH", ""))}
                              />
                              <Button
                                variant="outline"
                                onClick={() => handleUnstake(pool.id)}
                                disabled={isUnstaking || !unstakeAmount || Number.parseFloat(unstakeAmount) <= 0}
                              >
                                {isUnstaking ? "Unstaking..." : isConnected ? "Unstake" : "Unstake (Demo)"}
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>

                      <Separator />

                      {selectedPool === pool.id ? (
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Stake Section */}
                            <div className="space-y-3">
                              <Label>Stake Amount (ETH)</Label>
                              <div className="flex gap-2">
                                <Input
                                  type="number"
                                  placeholder="0.0"
                                  value={stakeAmount}
                                  onChange={(e) => setStakeAmount(e.target.value)}
                                  step="0.01"
                                  min="0"
                                />
                                <Button
                                  onClick={() => handleStake(pool.id)}
                                  disabled={isStaking || !stakeAmount || Number.parseFloat(stakeAmount) <= 0}
                                >
                                  {isStaking ? "Staking..." : isConnected ? "Stake" : "Stake (Demo)"}
                                </Button>
                              </div>
                            </div>

                            {/* Unstake Section */}
                            {Number.parseFloat(pool.myStake.replace(" ETH", "")) > 0 && (
                              <div className="space-y-3">
                                <Label>Unstake Amount (ETH)</Label>
                                <div className="flex gap-2">
                                  <Input
                                    type="number"
                                    placeholder="0.0"
                                    value={unstakeAmount}
                                    onChange={(e) => setUnstakeAmount(e.target.value)}
                                    step="0.01"
                                    min="0"
                                    max={Number.parseFloat(pool.myStake.replace(" ETH", ""))}
                                  />
                                  <Button
                                    variant="outline"
                                    onClick={() => handleUnstake(pool.id)}
                                    disabled={isUnstaking || !unstakeAmount || Number.parseFloat(unstakeAmount) <= 0}
                                  >
                                    {isUnstaking ? "Unstaking..." : isConnected ? "Unstake" : "Unstake (Demo)"}
                                  </Button>
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="flex justify-between">
                            <Button variant="outline" onClick={() => setSelectedPool(null)}>
                              Cancel
                            </Button>
                            {Number.parseFloat(pool.rewards.replace(" ETH", "")) > 0 && (
                              <Button onClick={() => handleClaimRewards(pool.id)}>
                                <Coins className="mr-2 h-4 w-4" />
                                {isConnected ? "Claim Rewards" : "Claim Rewards (Demo)"}
                              </Button>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-between">
                          <Button variant="outline" onClick={() => setSelectedPool(pool.id)}>
                            {Number.parseFloat(pool.myStake.replace(" ETH", "")) > 0 ? "Manage Stake" : "Stake Now"}
                          </Button>
                          {Number.parseFloat(pool.rewards.replace(" ETH", "")) > 0 && (
                            <Button onClick={() => handleClaimRewards(pool.id)}>
                              <Coins className="mr-2 h-4 w-4" />
                              Claim {pool.rewards} {!isConnected && "(Demo)"}
                            </Button>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* My Stakes Tab */}
            <TabsContent value="my-stakes" className="space-y-6">
              <div className="grid gap-4">
                {stakingPools
                  .filter((pool) => Number.parseFloat(pool.myStake.replace(" ETH", "")) > 0)
                  .map((pool) => (
                    <Card key={pool.id}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="font-semibold text-lg">{pool.storyTitle}</h3>
                            <p className="text-sm text-muted-foreground">Staked: {pool.myStake}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-green-600">{pool.rewards}</div>
                            <div className="text-sm text-muted-foreground">Rewards</div>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <Label className="text-muted-foreground">APY</Label>
                            <p className="font-semibold">{pool.apy}%</p>
                          </div>
                          <div>
                            <Label className="text-muted-foreground">Lock Period</Label>
                            <p className="font-semibold">{pool.lockPeriod}</p>
                          </div>
                          <div>
                            <Label className="text-muted-foreground">Status</Label>
                            <Badge variant={pool.status === "Active" ? "default" : "secondary"}>{pool.status}</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                {stakingPools.filter((pool) => Number.parseFloat(pool.myStake.replace(" ETH", "")) > 0).length ===
                  0 && (
                  <Card>
                    <CardContent className="text-center py-12">
                      <Lock className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="font-semibold mb-2">No Active Stakes</h3>
                      <p className="text-muted-foreground mb-4">You haven't staked in any stories yet.</p>
                      <Button onClick={() => setActiveTab("pools")}>Browse Staking Pools</Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            {/* History Tab */}
            <TabsContent value="history" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Transaction History</CardTitle>
                  <CardDescription>Your staking and reward history</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {stakingHistory.map((tx) => (
                      <div key={tx.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div
                            className={`p-2 rounded-full ${
                              tx.action === "Stake"
                                ? "bg-blue-100 text-blue-600"
                                : tx.action === "Reward"
                                  ? "bg-green-100 text-green-600"
                                  : "bg-orange-100 text-orange-600"
                            }`}
                          >
                            {tx.action === "Stake" ? (
                              <ArrowDownRight className="h-4 w-4" />
                            ) : tx.action === "Reward" ? (
                              <Coins className="h-4 w-4" />
                            ) : (
                              <ArrowUpRight className="h-4 w-4" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">
                              {tx.action} - {tx.story}
                            </p>
                            <p className="text-sm text-muted-foreground">{tx.timestamp}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{tx.amount}</p>
                          <Badge variant="outline" className="text-xs">
                            {tx.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
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
