"use client"

import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ModerationPanel } from "@/components/moderation-panel"
import {
  Shield,
  Users,
  BookOpen,
  Flag,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Settings,
} from "lucide-react"

// Mock admin data
const platformStats = {
  totalUsers: 8932,
  activeStories: 1247,
  totalChapters: 23451,
  flaggedContent: 12,
  resolvedToday: 24,
  pendingReports: 7,
  monthlyGrowth: 23,
  revenueGenerated: "156.7 ETH",
}

const recentActivity = [
  {
    id: 1,
    type: "user_joined",
    message: "New user registered: CyberWriter2024",
    timestamp: "2 minutes ago",
    icon: Users,
    color: "text-green-600",
  },
  {
    id: 2,
    type: "story_created",
    message: "New story created: 'The Digital Frontier'",
    timestamp: "15 minutes ago",
    icon: BookOpen,
    color: "text-blue-600",
  },
  {
    id: 3,
    type: "content_flagged",
    message: "Content flagged for review in 'Mystery Novel'",
    timestamp: "32 minutes ago",
    icon: Flag,
    color: "text-red-600",
  },
  {
    id: 4,
    type: "moderation_resolved",
    message: "Moderation case resolved: Spam comment removed",
    timestamp: "1 hour ago",
    icon: CheckCircle,
    color: "text-green-600",
  },
]

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="h-6 w-6 text-primary" />
            <h1 className="font-serif text-4xl font-bold">Admin Dashboard</h1>
          </div>
          <p className="text-lg text-muted-foreground">Platform management and moderation tools</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-bold">{platformStats.totalUsers.toLocaleString()}</p>
                </div>
                <Users className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Stories</p>
                  <p className="text-2xl font-bold">{platformStats.activeStories.toLocaleString()}</p>
                </div>
                <BookOpen className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Flagged Content</p>
                  <p className="text-2xl font-bold text-red-600">{platformStats.flaggedContent}</p>
                </div>
                <Flag className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Monthly Growth</p>
                  <p className="text-2xl font-bold text-green-600">+{platformStats.monthlyGrowth}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="moderation">Moderation</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest platform events and actions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => {
                      const Icon = activity.icon
                      return (
                        <div key={activity.id} className="flex items-start gap-3">
                          <div className={`p-2 rounded-full bg-muted`}>
                            <Icon className={`h-4 w-4 ${activity.color}`} />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{activity.message}</p>
                            <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Moderation Queue */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Moderation Queue
                  </CardTitle>
                  <CardDescription>Content requiring immediate attention</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">High Priority</span>
                    <Badge variant="destructive">3 items</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Under Review</span>
                    <Badge variant="secondary">7 items</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Pending Investigation</span>
                    <Badge variant="outline">2 items</Badge>
                  </div>
                  <Button className="w-full mt-4">
                    <Flag className="mr-2 h-4 w-4" />
                    Review Queue
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Platform Health */}
            <Card>
              <CardHeader>
                <CardTitle>Platform Health</CardTitle>
                <CardDescription>Key metrics and system status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{platformStats.resolvedToday}</div>
                    <div className="text-sm text-muted-foreground">Cases Resolved Today</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">{platformStats.pendingReports}</div>
                    <div className="text-sm text-muted-foreground">Pending Reports</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{platformStats.revenueGenerated}</div>
                    <div className="text-sm text-muted-foreground">Revenue Generated</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">99.9%</div>
                    <div className="text-sm text-muted-foreground">Uptime</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Moderation */}
          <TabsContent value="moderation">
            <ModerationPanel userRole="admin" />
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Platform Analytics
                </CardTitle>
                <CardDescription>Detailed insights and metrics</CardDescription>
              </CardHeader>
              <CardContent className="text-center py-12">
                <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Analytics Dashboard</h3>
                <p className="text-muted-foreground mb-4">
                  Comprehensive analytics and reporting tools will be available in the next update.
                </p>
                <Button variant="outline">Request Analytics Access</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Platform Settings
                </CardTitle>
                <CardDescription>Configure platform parameters and policies</CardDescription>
              </CardHeader>
              <CardContent className="text-center py-12">
                <Settings className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Settings Panel</h3>
                <p className="text-muted-foreground mb-4">
                  Advanced configuration options for platform administrators.
                </p>
                <Button variant="outline">Access Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
