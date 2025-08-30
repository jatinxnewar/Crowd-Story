"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Coins, TrendingUp, Download, Calendar, DollarSign, Percent } from "lucide-react"

// Mock revenue data
const revenueData = [
  { month: "Jan", amount: 0.5 },
  { month: "Feb", amount: 0.8 },
  { month: "Mar", amount: 1.2 },
  { month: "Apr", amount: 0.9 },
  { month: "May", amount: 1.5 },
  { month: "Jun", amount: 2.1 },
]

const revenueBySource = [
  { name: "E-book Sales", value: 45, amount: "2.1 ETH", color: "#0891b2" },
  { name: "Print Rights", value: 25, amount: "1.2 ETH", color: "#10b981" },
  { name: "Streaming", value: 20, amount: "0.9 ETH", color: "#8b5cf6" },
  { name: "Merchandise", value: 10, amount: "0.5 ETH", color: "#f59e0b" },
]

const payoutHistory = [
  {
    id: 1,
    date: "2024-03-15",
    amount: "0.45 ETH",
    stories: ["The Quantum Chronicles", "Digital Hearts"],
    txHash: "0xabcd...1234",
    status: "Completed",
  },
  {
    id: 2,
    date: "2024-02-28",
    amount: "0.32 ETH",
    stories: ["Shadows of the Old Kingdom"],
    txHash: "0xefgh...5678",
    status: "Completed",
  },
  {
    id: 3,
    date: "2024-02-15",
    amount: "0.28 ETH",
    stories: ["The Quantum Chronicles"],
    txHash: "0xijkl...9012",
    status: "Completed",
  },
]

interface RevenueDashboardProps {
  totalEarnings: string
  claimableAmount: string
  onClaim: () => void
}

export function RevenueDashboard({ totalEarnings, claimableAmount, onClaim }: RevenueDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="space-y-6">
      {/* Revenue Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Earnings</p>
                <p className="text-2xl font-bold">{totalEarnings}</p>
              </div>
              <DollarSign className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Claimable</p>
                <p className="text-2xl font-bold text-green-600">{claimableAmount}</p>
              </div>
              <Coins className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">This Month</p>
                <p className="text-2xl font-bold">0.34 ETH</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Growth</p>
                <p className="text-2xl font-bold text-green-600">+23%</p>
              </div>
              <Percent className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Claim Revenue Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Coins className="h-5 w-5" />
            Claimable Revenue
          </CardTitle>
          <CardDescription>Revenue available for withdrawal to your wallet</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">{claimableAmount}</div>
              <p className="text-sm text-muted-foreground">From 3 stories • Last updated 2 hours ago</p>
            </div>
            <Button onClick={onClaim} size="lg">
              <Coins className="mr-2 h-5 w-5" />
              Claim Revenue
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Revenue Analytics Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Revenue Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
                <CardDescription>Monthly earnings over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value} ETH`, "Revenue"]} />
                    <Line type="monotone" dataKey="amount" stroke="#0891b2" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Revenue by Source */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue Sources</CardTitle>
                <CardDescription>Breakdown by monetization type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {revenueBySource.map((source) => (
                    <div key={source.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{source.name}</span>
                        <span className="text-sm text-muted-foreground">{source.amount}</span>
                      </div>
                      <Progress value={source.value} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Pie Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={revenueBySource}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {revenueBySource.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Average per Story</span>
                  <span className="font-medium">0.48 ETH</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Best Performing Story</span>
                  <span className="font-medium">The Quantum Chronicles</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Revenue Growth (30d)</span>
                  <span className="font-medium text-green-600">+23%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Active Revenue Streams</span>
                  <span className="font-medium">4</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Payout History</CardTitle>
                  <CardDescription>Your previous revenue claims and transactions</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {payoutHistory.map((payout) => (
                  <div key={payout.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <div className="font-medium">{payout.amount}</div>
                      <div className="text-sm text-muted-foreground">{payout.stories.join(", ")}</div>
                      <div className="text-xs text-muted-foreground">TX: {payout.txHash}</div>
                    </div>
                    <div className="text-right space-y-1">
                      <Badge variant="default">{payout.status}</Badge>
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {payout.date}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
