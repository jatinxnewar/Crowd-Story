"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { BookOpen, Edit, Palette, Mic, Star, TrendingUp, Award } from "lucide-react"

interface ContributionData {
  totalContributions: number
  reputation: number
  level: string
  nextLevelProgress: number
  contributionBreakdown: {
    writing: { count: number; weight: number }
    editing: { count: number; weight: number }
    illustration: { count: number; weight: number }
    narration: { count: number; weight: number }
  }
  recentAchievements: Array<{
    id: number
    title: string
    description: string
    date: string
    type: "milestone" | "achievement" | "badge"
  }>
}

interface ContributionTrackerProps {
  data: ContributionData
}

export function ContributionTracker({ data }: ContributionTrackerProps) {
  const totalWeight = Object.values(data.contributionBreakdown).reduce((sum, type) => sum + type.weight, 0)

  const contributionTypes = [
    {
      key: "writing",
      label: "Writing",
      icon: BookOpen,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      data: data.contributionBreakdown.writing,
    },
    {
      key: "editing",
      label: "Editing",
      icon: Edit,
      color: "text-green-600",
      bgColor: "bg-green-100",
      data: data.contributionBreakdown.editing,
    },
    {
      key: "illustration",
      label: "Illustration",
      icon: Palette,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      data: data.contributionBreakdown.illustration,
    },
    {
      key: "narration",
      label: "Narration",
      icon: Mic,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      data: data.contributionBreakdown.narration,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Reputation & Level */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Reputation & Level
          </CardTitle>
          <CardDescription>Your standing in the StoryDAO community</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-primary">{data.reputation}</div>
              <div className="text-sm text-muted-foreground">Reputation Points</div>
            </div>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              {data.level}
            </Badge>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Progress to next level</span>
              <span>{data.nextLevelProgress}%</span>
            </div>
            <Progress value={data.nextLevelProgress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Contribution Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Contribution Breakdown</CardTitle>
          <CardDescription>Your contributions across different categories</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {contributionTypes.map((type) => {
              const Icon = type.icon
              const percentage = totalWeight > 0 ? (type.data.weight / totalWeight) * 100 : 0

              return (
                <div key={type.key} className="text-center">
                  <div
                    className={`w-16 h-16 rounded-full ${type.bgColor} flex items-center justify-center mx-auto mb-2`}
                  >
                    <Icon className={`h-8 w-8 ${type.color}`} />
                  </div>
                  <div className="text-2xl font-bold">{type.data.count}</div>
                  <div className="text-sm text-muted-foreground">{type.label}</div>
                  <div className="text-xs text-muted-foreground">Weight: {type.data.weight}</div>
                </div>
              )
            })}
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="font-medium">Contribution Weight Distribution</h4>
            {contributionTypes.map((type) => {
              const percentage = totalWeight > 0 ? (type.data.weight / totalWeight) * 100 : 0

              return (
                <div key={type.key} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${type.bgColor}`} />
                      <span>{type.label}</span>
                    </div>
                    <span>
                      {type.data.weight} ({percentage.toFixed(1)}%)
                    </span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Recent Achievements
          </CardTitle>
          <CardDescription>Your latest milestones and accomplishments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.recentAchievements.map((achievement) => (
              <div key={achievement.id} className="flex items-start gap-4 p-3 border rounded-lg">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                  {achievement.type === "milestone" && <TrendingUp className="h-5 w-5 text-primary" />}
                  {achievement.type === "achievement" && <Award className="h-5 w-5 text-primary" />}
                  {achievement.type === "badge" && <Star className="h-5 w-5 text-primary" />}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{achievement.title}</div>
                  <div className="text-sm text-muted-foreground">{achievement.description}</div>
                  <div className="text-xs text-muted-foreground mt-1">{achievement.date}</div>
                </div>
                <Badge variant="outline" className="capitalize">
                  {achievement.type}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Stats Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Contribution Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">{data.totalContributions}</div>
              <div className="text-sm text-muted-foreground">Total Contributions</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">{totalWeight}</div>
              <div className="text-sm text-muted-foreground">Total Weight</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">{data.reputation}</div>
              <div className="text-sm text-muted-foreground">Reputation Score</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
