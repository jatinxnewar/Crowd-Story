"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Trophy, Clock, Users, Coins, BookOpen, Edit, Palette, Mic, Search, Calendar } from "lucide-react"

// Mock bounty data
const activeBounties = [
  {
    id: 1,
    title: "Write Chapter 15 for The Quantum Chronicles",
    description:
      "We need a compelling chapter that explores Elena's first encounter with her alternate self. Must maintain the established tone and character development.",
    story: "The Quantum Chronicles",
    type: "Writing",
    reward: "0.5 ETH",
    deadline: "2024-04-15",
    timeLeft: "5 days",
    applicants: 12,
    maxApplicants: 20,
    difficulty: "Intermediate",
    requirements: ["2000-3000 words", "Maintain character consistency", "Include quantum physics elements"],
    sponsor: "QuantumWriter",
    status: "Open",
  },
  {
    id: 2,
    title: "Create Cover Art for Digital Hearts",
    description: "Design a cyberpunk-themed book cover that captures the romance and technology themes of the story.",
    story: "Digital Hearts",
    type: "Illustration",
    reward: "0.3 ETH",
    deadline: "2024-04-20",
    timeLeft: "10 days",
    applicants: 8,
    maxApplicants: 15,
    difficulty: "Advanced",
    requirements: ["High resolution (300 DPI)", "Cyberpunk aesthetic", "Include main characters"],
    sponsor: "CyberRomancer",
    status: "Open",
  },
  {
    id: 3,
    title: "Edit and Proofread Fantasy Epic",
    description:
      "Professional editing needed for a 50,000-word fantasy novel. Focus on pacing and character development.",
    story: "Shadows of the Old Kingdom",
    type: "Editing",
    reward: "0.8 ETH",
    deadline: "2024-05-01",
    timeLeft: "21 days",
    applicants: 5,
    maxApplicants: 10,
    difficulty: "Expert",
    requirements: ["Professional editing experience", "Fantasy genre knowledge", "Detailed feedback"],
    sponsor: "FantasyMaster",
    status: "Open",
  },
  {
    id: 4,
    title: "Narrate Audio Version of Sci-Fi Short",
    description: "Record professional narration for a 5,000-word sci-fi short story with multiple character voices.",
    story: "The Last Signal",
    type: "Narration",
    reward: "0.4 ETH",
    deadline: "2024-04-25",
    timeLeft: "15 days",
    applicants: 15,
    maxApplicants: 15,
    difficulty: "Intermediate",
    requirements: ["Professional recording equipment", "Character voice acting", "Clean audio quality"],
    sponsor: "SciFiNarrator",
    status: "Full",
  },
]

const myApplications = [
  {
    id: 1,
    bountyTitle: "Write Chapter 12 for Space Opera",
    story: "Galactic Odyssey",
    type: "Writing",
    reward: "0.6 ETH",
    appliedDate: "2024-03-20",
    status: "Under Review",
    submissionDate: "2024-03-25",
  },
  {
    id: 2,
    bountyTitle: "Character Design for Fantasy Novel",
    story: "Dragon's Legacy",
    type: "Illustration",
    reward: "0.4 ETH",
    appliedDate: "2024-03-15",
    status: "Accepted",
    submissionDate: "2024-03-30",
  },
]

const bountyTypes = [
  { key: "writing", label: "Writing", icon: BookOpen, color: "text-blue-600" },
  { key: "editing", label: "Editing", icon: Edit, color: "text-green-600" },
  { key: "illustration", label: "Illustration", icon: Palette, color: "text-purple-600" },
  { key: "narration", label: "Narration", icon: Mic, color: "text-orange-600" },
]

export default function BountiesPage() {
  const [activeTab, setActiveTab] = useState("browse")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterDifficulty, setFilterDifficulty] = useState("all")
  const [showCreateForm, setShowCreateForm] = useState(false)

  // Create bounty form state
  const [newBounty, setNewBounty] = useState({
    title: "",
    description: "",
    story: "",
    type: "",
    reward: "",
    deadline: "",
    maxApplicants: "",
    difficulty: "",
    requirements: "",
  })

  const handleApplyToBounty = (bountyId: number) => {
    console.log("[v0] Applying to bounty:", bountyId)
    alert("Application submitted successfully! (This is a demo)")
  }

  const handleCreateBounty = () => {
    console.log("[v0] Creating bounty:", newBounty)
    alert("Bounty created successfully! (This is a demo)")
    setShowCreateForm(false)
    setNewBounty({
      title: "",
      description: "",
      story: "",
      type: "",
      reward: "",
      deadline: "",
      maxApplicants: "",
      difficulty: "",
      requirements: "",
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif text-4xl font-bold mb-2">Bounties</h1>
          <p className="text-lg text-muted-foreground">
            Discover writing challenges and earn rewards for your contributions
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{activeBounties.length}</div>
              <div className="text-sm text-muted-foreground">Active Bounties</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">12.4 ETH</div>
              <div className="text-sm text-muted-foreground">Total Rewards</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">156</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">89</div>
              <div className="text-sm text-muted-foreground">Contributors</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="browse">Browse Bounties</TabsTrigger>
            <TabsTrigger value="my-applications">My Applications</TabsTrigger>
            <TabsTrigger value="create">Create Bounty</TabsTrigger>
          </TabsList>

          {/* Browse Bounties */}
          <TabsContent value="browse" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search bounties..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="writing">Writing</SelectItem>
                      <SelectItem value="editing">Editing</SelectItem>
                      <SelectItem value="illustration">Illustration</SelectItem>
                      <SelectItem value="narration">Narration</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterDifficulty} onValueChange={setFilterDifficulty}>
                    <SelectTrigger className="w-full md:w-48">
                      <SelectValue placeholder="Difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                      <SelectItem value="expert">Expert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Bounty Cards */}
            <div className="space-y-4">
              {activeBounties.map((bounty) => {
                const typeInfo = bountyTypes.find((t) => t.key === bounty.type.toLowerCase())
                const Icon = typeInfo?.icon || Trophy
                const progress = (bounty.applicants / bounty.maxApplicants) * 100

                return (
                  <Card key={bounty.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Icon className={`h-5 w-5 ${typeInfo?.color || "text-primary"}`} />
                            <Badge variant="secondary">{bounty.type}</Badge>
                            <Badge
                              variant={
                                bounty.difficulty === "Expert"
                                  ? "destructive"
                                  : bounty.difficulty === "Advanced"
                                    ? "default"
                                    : "outline"
                              }
                            >
                              {bounty.difficulty}
                            </Badge>
                            <Badge variant={bounty.status === "Open" ? "default" : "secondary"}>{bounty.status}</Badge>
                          </div>
                          <CardTitle className="text-xl">{bounty.title}</CardTitle>
                          <CardDescription className="mt-2">{bounty.description}</CardDescription>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary">{bounty.reward}</div>
                          <div className="text-sm text-muted-foreground">Reward</div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="text-muted-foreground">Story</div>
                          <div className="font-medium">{bounty.story}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Deadline</div>
                          <div className="font-medium">{bounty.deadline}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Time Left</div>
                          <div className="font-medium flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {bounty.timeLeft}
                          </div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Sponsor</div>
                          <div className="font-medium">{bounty.sponsor}</div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Applications</span>
                          <span>
                            {bounty.applicants} / {bounty.maxApplicants}
                          </span>
                        </div>
                        <Progress value={progress} className="h-2" />
                      </div>

                      <div>
                        <div className="text-sm font-medium mb-2">Requirements:</div>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {bounty.requirements.map((req, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <div className="w-1 h-1 bg-muted-foreground rounded-full" />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Separator />

                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>{bounty.applicants} applicants</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{bounty.timeLeft} left</span>
                          </div>
                        </div>
                        <Button onClick={() => handleApplyToBounty(bounty.id)} disabled={bounty.status === "Full"}>
                          {bounty.status === "Full" ? "Full" : "Apply Now"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          {/* My Applications */}
          <TabsContent value="my-applications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>My Bounty Applications</CardTitle>
                <CardDescription>Track your submitted applications and their status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {myApplications.map((application) => (
                    <div key={application.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <div className="font-medium">{application.bountyTitle}</div>
                        <div className="text-sm text-muted-foreground">{application.story}</div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Applied: {application.appliedDate}</span>
                          <span>•</span>
                          <span>Submission: {application.submissionDate}</span>
                        </div>
                      </div>
                      <div className="text-right space-y-1">
                        <Badge
                          variant={
                            application.status === "Accepted"
                              ? "default"
                              : application.status === "Under Review"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {application.status}
                        </Badge>
                        <div className="text-sm font-medium">{application.reward}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Create Bounty */}
          <TabsContent value="create" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Create New Bounty</CardTitle>
                <CardDescription>Post a challenge for the community to complete</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Bounty Title</label>
                    <Input
                      placeholder="Enter bounty title"
                      value={newBounty.title}
                      onChange={(e) => setNewBounty({ ...newBounty, title: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Story</label>
                    <Input
                      placeholder="Related story name"
                      value={newBounty.story}
                      onChange={(e) => setNewBounty({ ...newBounty, story: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    placeholder="Describe what you need and any specific requirements"
                    value={newBounty.description}
                    onChange={(e) => setNewBounty({ ...newBounty, description: e.target.value })}
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Type</label>
                    <Select
                      value={newBounty.type}
                      onValueChange={(value) => setNewBounty({ ...newBounty, type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="writing">Writing</SelectItem>
                        <SelectItem value="editing">Editing</SelectItem>
                        <SelectItem value="illustration">Illustration</SelectItem>
                        <SelectItem value="narration">Narration</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Difficulty</label>
                    <Select
                      value={newBounty.difficulty}
                      onValueChange={(value) => setNewBounty({ ...newBounty, difficulty: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                        <SelectItem value="expert">Expert</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Max Applicants</label>
                    <Input
                      type="number"
                      placeholder="20"
                      value={newBounty.maxApplicants}
                      onChange={(e) => setNewBounty({ ...newBounty, maxApplicants: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Reward (ETH)</label>
                    <Input
                      placeholder="0.5"
                      value={newBounty.reward}
                      onChange={(e) => setNewBounty({ ...newBounty, reward: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Deadline</label>
                    <Input
                      type="date"
                      value={newBounty.deadline}
                      onChange={(e) => setNewBounty({ ...newBounty, deadline: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Requirements</label>
                  <Textarea
                    placeholder="List specific requirements (one per line)"
                    value={newBounty.requirements}
                    onChange={(e) => setNewBounty({ ...newBounty, requirements: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className="flex justify-end gap-4">
                  <Button variant="outline">Save Draft</Button>
                  <Button onClick={handleCreateBounty}>
                    <Coins className="mr-2 h-4 w-4" />
                    Create Bounty
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
