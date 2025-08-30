"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { BookOpen, Eye, Send } from "lucide-react"
import { useContributionNFT } from "@/hooks/use-contract"
import { CONTRIBUTION_TYPES } from "@/lib/contracts"
import { useAccount } from "wagmi"

interface ChapterProposalProps {
  storyId: string
  onSubmit: (proposal: any) => void
}

export function ChapterProposal({ storyId, onSubmit }: ChapterProposalProps) {
  const { address, isConnected } = useAccount()
  const { mintContribution, isPending, isConfirming, isSuccess, error } = useContributionNFT()

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [summary, setSummary] = useState("")
  const [branchFrom, setBranchFrom] = useState("canon")
  const [isPreview, setIsPreview] = useState(false)

  const handleSubmit = async () => {
    if (!isConnected || !address) {
      alert("Please connect your wallet first")
      return
    }

    if (!title || !content || !summary) {
      alert("Please fill in all required fields")
      return
    }

    try {
      const proposal = {
        storyId,
        title,
        content,
        summary,
        branchFrom: branchFrom || null,
        timestamp: new Date().toISOString(),
      }

      console.log("[v0] Submitting proposal with smart contract:", proposal)

      // Create metadata URI (in real app, this would upload to IPFS)
      const metadata = {
        ...proposal,
        wordCount: content.split(/\s+/).filter((word) => word.length > 0).length,
        type: "chapter_proposal",
      }
      const metadataURI = `ipfs://mock-proposal-${Date.now()}`

      // Mint contribution NFT for the proposal
      await mintContribution({
        to: address,
        storyId: BigInt(storyId),
        chapterId: BigInt(Date.now()), // Mock chapter ID
        contributionType: CONTRIBUTION_TYPES.WRITING,
        weight: BigInt(metadata.wordCount),
        metadataURI,
      })

      console.log("[v0] Proposal NFT minting transaction submitted")
      onSubmit(proposal)
    } catch (err) {
      console.error("[v0] Error submitting proposal:", err)
      alert("Failed to submit proposal. Please try again.")
    }
  }

  const wordCount = content.split(/\s+/).filter((word) => word.length > 0).length

  if (isSuccess) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Proposal Submitted Successfully!</CardTitle>
            <CardDescription>
              Your chapter proposal has been submitted to the blockchain for community voting.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              You've received a contribution NFT for your proposal. The community will now vote on whether to accept it.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Propose New Chapter
          </CardTitle>
          <CardDescription>Submit your chapter proposal for community voting</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Chapter Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Chapter Title</Label>
              <Input
                id="title"
                placeholder="Enter chapter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="branch">Branch From (Optional)</Label>
              <Select value={branchFrom} onValueChange={setBranchFrom}>
                <SelectTrigger>
                  <SelectValue placeholder="Continue from canon or create branch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="canon">Canon (Main Story)</SelectItem>
                  <SelectItem value="12">Chapter 12: The Discovery</SelectItem>
                  <SelectItem value="11">Chapter 11: First Contact</SelectItem>
                  <SelectItem value="10">Chapter 10: The Signal</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="summary">Chapter Summary</Label>
            <Textarea
              id="summary"
              placeholder="Brief summary of what happens in this chapter"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              rows={3}
            />
          </div>

          <Separator />

          {/* Content Editor */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="content">Chapter Content</Label>
              <div className="flex items-center gap-4">
                <Badge variant="outline">{wordCount} words</Badge>
                <Button variant="outline" size="sm" onClick={() => setIsPreview(!isPreview)}>
                  <Eye className="mr-2 h-4 w-4" />
                  {isPreview ? "Edit" : "Preview"}
                </Button>
              </div>
            </div>

            {isPreview ? (
              <Card>
                <CardHeader>
                  <CardTitle>{title || "Chapter Title"}</CardTitle>
                  {summary && <CardDescription>{summary}</CardDescription>}
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none">
                    {content.split("\n").map((paragraph, index) => (
                      <p key={index} className="mb-4">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Textarea
                id="content"
                placeholder="Write your chapter content here. Use line breaks to separate paragraphs."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={20}
                className="font-mono text-sm"
              />
            )}
          </div>

          {/* Submission Guidelines */}
          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle className="text-lg">Submission Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>• Chapters should be between 1,000-5,000 words</p>
              <p>• Maintain consistency with established characters and lore</p>
              <p>• Follow the story's established rules and tone</p>
              <p>• Proposals will be voted on by the community for 7 days</p>
              <p>• You'll receive contribution NFTs if your chapter is accepted</p>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end gap-4">
            <Button variant="outline">Save Draft</Button>
            <Button
              onClick={handleSubmit}
              disabled={isPending || isConfirming || !title || !content || wordCount < 100}
            >
              <Send className="mr-2 h-4 w-4" />
              {isPending || isConfirming ? "Submitting..." : "Submit Proposal"}
            </Button>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800">Error: {error.message}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
