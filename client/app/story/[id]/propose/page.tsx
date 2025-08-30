"use client"

import { Navigation } from "@/components/navigation"
import { ChapterProposal } from "@/components/chapter-proposal"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ProposeChapterPage({ params }: { params: { id: string } }) {
  const handleSubmitProposal = (proposal: any) => {
    console.log("[v0] Proposal submitted:", proposal)
    // Here we would interact with smart contracts
    alert("Proposal submitted successfully! (This is a demo)")
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="outline" asChild>
            <Link href={`/story/${params.id}`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Story
            </Link>
          </Button>
        </div>

        <ChapterProposal storyId={params.id} onSubmit={handleSubmitProposal} />
      </div>
    </div>
  )
}
