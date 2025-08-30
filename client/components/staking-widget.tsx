"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Coins, Lock, Info } from "lucide-react"

interface StakingWidgetProps {
  storyId: string
  storyTitle: string
  totalStaked: string
  apy: number
  minStake?: number
  lockPeriod: string
  onStake?: (amount: string) => void
}

export function StakingWidget({
  storyId,
  storyTitle,
  totalStaked,
  apy,
  minStake = 0.01,
  lockPeriod,
  onStake,
}: StakingWidgetProps) {
  const [stakeAmount, setStakeAmount] = useState("")
  const [isStaking, setIsStaking] = useState(false)

  const handleStake = async () => {
    if (!stakeAmount || Number.parseFloat(stakeAmount) < minStake) return

    setIsStaking(true)
    console.log("[v0] Staking in story:", { storyId, amount: stakeAmount })

    if (onStake) {
      onStake(stakeAmount)
    }

    // Mock staking delay
    setTimeout(() => {
      setIsStaking(false)
      setStakeAmount("")
    }, 2000)
  }

  const estimatedRewards = stakeAmount ? ((Number.parseFloat(stakeAmount) * apy) / 100).toFixed(4) : "0"

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Coins className="h-5 w-5" />
          Stake in Story
        </CardTitle>
        <CardDescription>Support "{storyTitle}" and earn rewards</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Story Stats */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <Label className="text-muted-foreground">Total Staked</Label>
            <p className="font-semibold">{totalStaked}</p>
          </div>
          <div>
            <Label className="text-muted-foreground">APY</Label>
            <p className="font-semibold text-green-600">{apy}%</p>
          </div>
        </div>

        {/* Stake Input */}
        <div className="space-y-2">
          <Label htmlFor="stake-amount">Stake Amount (ETH)</Label>
          <Input
            id="stake-amount"
            type="number"
            placeholder={`Min: ${minStake} ETH`}
            value={stakeAmount}
            onChange={(e) => setStakeAmount(e.target.value)}
            step="0.01"
            min={minStake}
          />
        </div>

        {/* Estimated Rewards */}
        {stakeAmount && Number.parseFloat(stakeAmount) >= minStake && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center justify-between text-sm">
              <span className="text-green-800">Estimated Annual Rewards:</span>
              <span className="font-semibold text-green-800">{estimatedRewards} ETH</span>
            </div>
          </div>
        )}

        {/* Lock Period Info */}
        <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
          <Lock className="h-4 w-4 text-muted-foreground" />
          <div className="text-sm">
            <p className="font-medium">Lock Period: {lockPeriod}</p>
            <p className="text-muted-foreground">Funds will be locked for this duration</p>
          </div>
        </div>

        {/* Stake Button */}
        <Button
          className="w-full"
          onClick={handleStake}
          disabled={isStaking || !stakeAmount || Number.parseFloat(stakeAmount) < minStake}
        >
          {isStaking ? "Staking..." : `Stake ${stakeAmount || "0"} ETH`}
        </Button>

        {/* Info */}
        <div className="flex items-start gap-2 text-xs text-muted-foreground">
          <Info className="h-3 w-3 mt-0.5 flex-shrink-0" />
          <p>
            Staking supports story development and gives you voting power in governance decisions. Rewards are
            distributed based on story performance and revenue.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
