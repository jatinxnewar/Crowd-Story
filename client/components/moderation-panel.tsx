"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Flag, AlertTriangle, Eye, MessageSquare, Gavel, User } from "lucide-react"

// Mock moderation data
const flaggedContent = [
  {
    id: 1,
    type: "Chapter",
    title: "Chapter 5: The Dark Turn",
    story: "Mystery Novel",
    author: "0x1234...5678",
    authorName: "MysteryWriter",
    flagReason: "Inappropriate Content",
    flagCount: 3,
    reportedBy: ["0xabcd...efgh", "0x9876...5432", "0xijkl...mnop"],
    content:
      "The chapter contains graphic violence that may not be suitable for all audiences. Multiple users have reported concerns about the explicit nature of the content.",
    timestamp: "2024-03-20 14:30",
    status: "Under Review",
    priority: "High",
  },
  {
    id: 2,
    type: "Proposal",
    title: "Chapter 12: Alternative Ending",
    story: "Sci-Fi Epic",
    author: "0x5678...9012",
    authorName: "SciFiAuthor",
    flagReason: "Plagiarism",
    flagCount: 2,
    reportedBy: ["0xdef0...1234", "0x5678...abcd"],
    content:
      "This proposal appears to contain content that closely resembles existing published work. Needs verification for originality.",
    timestamp: "2024-03-19 09:15",
    status: "Pending Investigation",
    priority: "Medium",
  },
  {
    id: 3,
    type: "Comment",
    title: "Comment on Chapter 8",
    story: "Romance Novel",
    author: "0x9012...3456",
    authorName: "Commenter123",
    flagReason: "Spam",
    flagCount: 5,
    reportedBy: ["0x1111...2222", "0x3333...4444", "0x5555...6666"],
    content: "Repetitive promotional content posted multiple times across different stories.",
    timestamp: "2024-03-18 16:45",
    status: "New",
    priority: "Low",
  },
]

const moderationActions = [
  { value: "approve", label: "Approve Content", color: "text-green-600" },
  { value: "hide", label: "Hide from Feed", color: "text-yellow-600" },
  { value: "remove", label: "Remove Content", color: "text-red-600" },
  { value: "warn", label: "Warn Author", color: "text-orange-600" },
  { value: "escalate", label: "Escalate to DAO", color: "text-purple-600" },
]

interface ModerationPanelProps {
  userRole: "moderator" | "admin" | "curator"
}

export function ModerationPanel({ userRole }: ModerationPanelProps) {
  const [activeTab, setActiveTab] = useState("flagged")
  const [selectedAction, setSelectedAction] = useState("")
  const [moderationNote, setModerationNote] = useState("")

  const handleModerationAction = (contentId: number, action: string) => {
    console.log("[v0] Moderation action:", { contentId, action, note: moderationNote })
    alert(`${action} action applied successfully! (This is a demo)`)
    setSelectedAction("")
    setModerationNote("")
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New":
        return "bg-blue-100 text-blue-800"
      case "Under Review":
        return "bg-yellow-100 text-yellow-800"
      case "Pending Investigation":
        return "bg-orange-100 text-orange-800"
      case "Resolved":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Flag className="h-5 w-5" />
            Moderation Dashboard
          </CardTitle>
          <CardDescription>Review and manage flagged content across the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">3</div>
              <div className="text-sm text-muted-foreground">High Priority</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">7</div>
              <div className="text-sm text-muted-foreground">Under Review</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">24</div>
              <div className="text-sm text-muted-foreground">Resolved Today</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">156</div>
              <div className="text-sm text-muted-foreground">Total This Month</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="flagged">Flagged Content</TabsTrigger>
          <TabsTrigger value="reports">User Reports</TabsTrigger>
          <TabsTrigger value="history">Moderation History</TabsTrigger>
        </TabsList>

        {/* Flagged Content */}
        <TabsContent value="flagged" className="space-y-4">
          {flaggedContent.map((item) => (
            <Card key={item.id} className="border-l-4 border-l-red-500">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{item.type}</Badge>
                      <Badge className={getPriorityColor(item.priority)}>{item.priority}</Badge>
                      <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                    </div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <CardDescription>
                      From: {item.story} • By: {item.authorName} • {item.timestamp}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-red-600 mb-1">
                      <Flag className="h-4 w-4" />
                      <span className="font-medium">{item.flagCount} flags</span>
                    </div>
                    <div className="text-sm text-muted-foreground">Reason: {item.flagReason}</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Content Preview:</h4>
                  <p className="text-sm text-muted-foreground bg-muted p-3 rounded">{item.content}</p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Reported By:</h4>
                  <div className="flex flex-wrap gap-2">
                    {item.reportedBy.map((reporter, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {reporter}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Moderation Action</label>
                      <Select value={selectedAction} onValueChange={setSelectedAction}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select action" />
                        </SelectTrigger>
                        <SelectContent>
                          {moderationActions.map((action) => (
                            <SelectItem key={action.value} value={action.value}>
                              <span className={action.color}>{action.label}</span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Priority</label>
                      <Select defaultValue={item.priority.toLowerCase()}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Moderation Notes</label>
                    <Textarea
                      placeholder="Add notes about your decision..."
                      value={moderationNote}
                      onChange={(e) => setModerationNote(e.target.value)}
                      rows={3}
                    />
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        View Full Content
                      </Button>
                      <Button variant="outline" size="sm">
                        <User className="mr-2 h-4 w-4" />
                        View Author Profile
                      </Button>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Contact Author
                      </Button>
                      <Button
                        onClick={() => handleModerationAction(item.id, selectedAction)}
                        disabled={!selectedAction}
                      >
                        <Gavel className="mr-2 h-4 w-4" />
                        Apply Action
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* User Reports */}
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>User Reports</CardTitle>
              <CardDescription>Recent reports submitted by community members</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold mb-2">No new reports</h3>
                <p className="text-muted-foreground">All user reports have been reviewed and processed.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Moderation History */}
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Moderation History</CardTitle>
              <CardDescription>Previous moderation actions and decisions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">Content removed: Inappropriate chapter</div>
                    <div className="text-sm text-muted-foreground">
                      Story: "Dark Fantasy" • Author warned • 2024-03-19
                    </div>
                  </div>
                  <Badge className="bg-red-100 text-red-800">Removed</Badge>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">Spam comment hidden from feed</div>
                    <div className="text-sm text-muted-foreground">
                      Story: "Romance Novel" • User temporarily restricted • 2024-03-18
                    </div>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-800">Hidden</Badge>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <div className="font-medium">False flag report dismissed</div>
                    <div className="text-sm text-muted-foreground">
                      Story: "Sci-Fi Adventure" • Content approved • 2024-03-17
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Approved</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
