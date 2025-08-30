"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Plus, X, Users, Coins, BookOpen, Settings, Wallet } from "lucide-react"
import { useAccount } from "wagmi"
import { useStoryFactory } from "@/hooks/use-contract"
import { generateRulesHash, validateStoryConfig, type StoryMetadata, type StoryRules } from "@/lib/story-utils"
import { useRouter } from "next/navigation"

const genres = [
  "Fantasy",
  "Sci-Fi",
  "Mystery",
  "Romance",
  "Thriller",
  "Horror",
  "Adventure",
  "Drama",
  "Comedy",
  "Historical",
  "Cyberpunk",
  "Dystopian",
]

interface Contributor {
  address: string
  percentage: number
  role: string
}

export default function CreateStoryPage() {
  const { address, isConnected } = useAccount()
  const { createStory, isPending, isConfirming, isSuccess, error } = useStoryFactory()
  const router = useRouter()
  const [step, setStep] = useState(1)

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [genre, setGenre] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [loreBible, setLoreBible] = useState("")
  const [contributors, setContributors] = useState<Contributor[]>([
    { address: address || "", percentage: 100, role: "Creator" },
  ])
  const [votingDuration, setVotingDuration] = useState("7")
  const [quorumThreshold, setQuorumThreshold] = useState("100")
  const [isPublic, setIsPublic] = useState(true)

  const addTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const addContributor = () => {
    setContributors([...contributors, { address: "", percentage: 0, role: "Contributor" }])
  }

  const updateContributor = (index: number, field: keyof Contributor, value: string | number) => {
    const updated = [...contributors]
    updated[index] = { ...updated[index], [field]: value }
    setContributors(updated)
  }

  const removeContributor = (index: number) => {
    if (contributors.length > 1) {
      setContributors(contributors.filter((_, i) => i !== index))
    }
  }

  const totalPercentage = contributors.reduce((sum, c) => sum + c.percentage, 0)

  const handleCreateStory = async () => {
    if (!isConnected || !address) {
      // Demo mode - show success without blockchain interaction
      alert("Demo mode: Story would be created on blockchain when wallet is connected!")
      setTimeout(() => {
        router.push("/explore")
      }, 1000)
      return
    }

    const metadata: StoryMetadata = {
      title,
      description,
      genre,
      tags,
      language: "en",
      contentRating: "PG-13",
    }

    const rules: StoryRules = {
      votingPeriod: Number.parseInt(votingDuration),
      quorumPercentage: (Number.parseInt(quorumThreshold) / 100) * 100,
      contributionWeights: {
        writing: 100,
        illustration: 80,
        editing: 60,
        narration: 70,
      },
      revenueSplitRules: {
        authorShare: 50,
        contributorShare: 45,
        platformFee: 5,
      },
    }

    const initialSplits = contributors.map((c) => c.percentage * 100)
    const initialContributorAddresses = contributors.map((c) => c.address)

    const validation = validateStoryConfig(metadata, rules, initialContributorAddresses, initialSplits)
    if (!validation.isValid) {
      alert(`Validation errors:\n${validation.errors.join("\n")}`)
      return
    }

    try {
      console.log("[v0] Creating story with smart contract:", {
        metadata,
        rules,
        contributors: initialContributorAddresses,
        splits: initialSplits.map((s) => BigInt(s)),
      })

      const metadataURI = `ipfs://mock-metadata-${Date.now()}`
      const rulesHash = generateRulesHash(rules)

      await createStory({
        owner: address,
        metadataURI,
        rulesHash,
        initialContributors: initialContributorAddresses,
        initialSplits: initialSplits.map((s) => BigInt(s)),
      })

      console.log("[v0] Story creation transaction submitted")
    } catch (err) {
      console.error("[v0] Error creating story:", err)
      alert("Failed to create story. Please try again.")
    }
  }

  if (isSuccess) {
    setTimeout(() => {
      router.push("/explore")
    }, 2000)

    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-16 text-center">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle>Story Created Successfully!</CardTitle>
              <CardDescription>Your story has been deployed to the blockchain.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Redirecting to explore page...</p>
              <Button onClick={() => router.push("/explore")}>View Stories</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-16 text-center">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle>Connect Wallet Required</CardTitle>
              <CardDescription>You need to connect your wallet to create a story on the blockchain.</CardDescription>
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
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="font-serif text-3xl font-bold mb-2">Create New Story</h1>
            <p className="text-muted-foreground">Start a collaborative storytelling project on the blockchain</p>

            {!isConnected && (
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
                <div className="flex items-center gap-2 text-sm text-blue-800 dark:text-blue-200">
                  <Wallet className="h-4 w-4" />
                  <span>Connect wallet to deploy to blockchain, or continue in demo mode</span>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                <BookOpen className="h-4 w-4" />
              </div>
              <div className={`h-px w-16 ${step >= 2 ? "bg-primary" : "bg-muted"}`} />
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                <Users className="h-4 w-4" />
              </div>
              <div className={`h-px w-16 ${step >= 3 ? "bg-primary" : "bg-muted"}`} />
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  step >= 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                <Settings className="h-4 w-4" />
              </div>
            </div>
          </div>

          {step === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Story Details</CardTitle>
                <CardDescription>Provide the basic information about your story</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Story Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter your story title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your story concept, themes, and what makes it unique"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="genre">Genre</Label>
                    <Select value={genre} onValueChange={setGenre}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a genre" />
                      </SelectTrigger>
                      <SelectContent>
                        {genres.map((g) => (
                          <SelectItem key={g} value={g}>
                            {g}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="tags"
                        placeholder="Add a tag"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && addTag()}
                      />
                      <Button type="button" onClick={addTag} size="sm">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                          {tag}
                          <X className="h-3 w-3 cursor-pointer" onClick={() => removeTag(tag)} />
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lore">Lore Bible (Optional)</Label>
                  <Textarea
                    id="lore"
                    placeholder="Define the world, characters, rules, and background lore for your story"
                    value={loreBible}
                    onChange={(e) => setLoreBible(e.target.value)}
                    rows={6}
                  />
                </div>

                <div className="flex justify-end">
                  <Button onClick={() => setStep(2)} disabled={!title || !description || !genre}>
                    Next: Contributors
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Contributors & Revenue Split</CardTitle>
                <CardDescription>Define who can contribute and how revenue will be shared</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Initial Contributors</Label>
                    <Button type="button" onClick={addContributor} size="sm" variant="outline">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Contributor
                    </Button>
                  </div>

                  {contributors.map((contributor, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg">
                      <div className="space-y-2">
                        <Label>Wallet Address</Label>
                        <Input
                          placeholder="0x..."
                          value={contributor.address}
                          onChange={(e) => updateContributor(index, "address", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Role</Label>
                        <Select
                          value={contributor.role}
                          onValueChange={(value) => updateContributor(index, "role", value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Creator">Creator</SelectItem>
                            <SelectItem value="Writer">Writer</SelectItem>
                            <SelectItem value="Editor">Editor</SelectItem>
                            <SelectItem value="Illustrator">Illustrator</SelectItem>
                            <SelectItem value="Contributor">Contributor</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Revenue %</Label>
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          value={contributor.percentage}
                          onChange={(e) => updateContributor(index, "percentage", Number.parseInt(e.target.value) || 0)}
                        />
                      </div>
                      <div className="flex items-end">
                        {contributors.length > 1 && (
                          <Button type="button" variant="outline" size="sm" onClick={() => removeContributor(index)}>
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}

                  <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <span className="font-medium">Total Revenue Split:</span>
                    <span className={`font-bold ${totalPercentage === 100 ? "text-green-600" : "text-red-600"}`}>
                      {totalPercentage}%
                    </span>
                  </div>

                  {totalPercentage !== 100 && (
                    <p className="text-sm text-red-600">Revenue splits must total exactly 100%</p>
                  )}
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button onClick={() => setStep(3)} disabled={totalPercentage !== 100}>
                    Next: Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {step === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>Governance Settings</CardTitle>
                <CardDescription>Configure how decisions will be made for your story</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="voting-duration">Voting Duration (days)</Label>
                    <Select value={votingDuration} onValueChange={setVotingDuration}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3 days</SelectItem>
                        <SelectItem value="7">7 days</SelectItem>
                        <SelectItem value="14">14 days</SelectItem>
                        <SelectItem value="30">30 days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="quorum">Minimum Quorum</Label>
                    <Input
                      id="quorum"
                      type="number"
                      min="1"
                      value={quorumThreshold}
                      onChange={(e) => setQuorumThreshold(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Minimum voting weight required for proposals to pass
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium">Story Visibility</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="public"
                        name="visibility"
                        checked={isPublic}
                        onChange={() => setIsPublic(true)}
                      />
                      <Label htmlFor="public">Public - Anyone can read and propose chapters</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="private"
                        name="visibility"
                        checked={!isPublic}
                        onChange={() => setIsPublic(false)}
                      />
                      <Label htmlFor="private">Private - Only invited contributors can participate</Label>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="bg-muted p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Summary</h4>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>
                      <strong>Title:</strong> {title}
                    </p>
                    <p>
                      <strong>Genre:</strong> {genre}
                    </p>
                    <p>
                      <strong>Contributors:</strong> {contributors.length}
                    </p>
                    <p>
                      <strong>Voting Duration:</strong> {votingDuration} days
                    </p>
                    <p>
                      <strong>Visibility:</strong> {isPublic ? "Public" : "Private"}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setStep(2)}>
                    Back
                  </Button>
                  <Button onClick={handleCreateStory} disabled={isPending || isConfirming || totalPercentage !== 100}>
                    <Coins className="mr-2 h-4 w-4" />
                    {isPending || isConfirming ? "Creating..." : isConnected ? "Create Story" : "Create Story (Demo)"}
                  </Button>
                </div>

                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-800">Error: {error.message}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
