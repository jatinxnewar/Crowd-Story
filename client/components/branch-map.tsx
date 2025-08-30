"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GitBranch, BookOpen, Vote } from "lucide-react"

interface BranchMapProps {
  storyId: string
}

// Mock data for story branches
const branchData = {
  canon: [
    { id: 1, title: "The Discovery", author: "QuantumWriter", votes: 156, isCanon: true },
    { id: 2, title: "First Jump", author: "SciFiMaster", votes: 203, isCanon: true },
    { id: 3, title: "The Paradox", author: "TimeWriter", votes: 178, isCanon: true },
  ],
  branches: [
    {
      id: "branch-1",
      title: "Alternative Timeline",
      branchFrom: 2,
      chapters: [
        { id: 4, title: "Mirror World", author: "ParallelThinker", votes: 89 },
        { id: 5, title: "Reversed Reality", author: "ParallelThinker", votes: 67 },
      ],
    },
    {
      id: "branch-2",
      title: "Dark Path",
      branchFrom: 1,
      chapters: [{ id: 6, title: "The Corruption", author: "DarkWriter", votes: 45 }],
    },
  ],
}

export function BranchMap({ storyId }: BranchMapProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-serif text-2xl font-bold mb-2">Story Branch Map</h2>
        <p className="text-muted-foreground">
          Visualize the different paths and storylines in this collaborative story
        </p>
      </div>

      {/* Canon Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Canon Timeline
          </CardTitle>
          <CardDescription>The main storyline accepted by the community</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {branchData.canon.map((chapter, index) => (
              <div key={chapter.id} className="flex items-center gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">
                    {chapter.id}
                  </div>
                  {index < branchData.canon.length - 1 && <div className="w-px h-8 bg-border" />}
                </div>
                <div className="flex-1 p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{chapter.title}</h4>
                    <Badge variant="default">Canon</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>by {chapter.author}</span>
                    <div className="flex items-center gap-1">
                      <Vote className="h-3 w-3" />
                      <span>{chapter.votes} votes</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Alternative Branches */}
      <div className="space-y-4">
        <h3 className="font-serif text-xl font-bold">Alternative Branches</h3>

        {branchData.branches.map((branch) => (
          <Card key={branch.id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GitBranch className="h-5 w-5" />
                {branch.title}
              </CardTitle>
              <CardDescription>Branches from Chapter {branch.branchFrom}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {branch.chapters.map((chapter, index) => (
                  <div key={chapter.id} className="flex items-center gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center text-secondary-foreground text-xs font-bold">
                        {chapter.id}
                      </div>
                      {index < branch.chapters.length - 1 && <div className="w-px h-6 bg-border" />}
                    </div>
                    <div className="flex-1 p-3 border rounded-lg bg-muted/50">
                      <div className="flex items-center justify-between mb-1">
                        <h5 className="font-medium text-sm">{chapter.title}</h5>
                        <Badge variant="outline">Branch</Badge>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>by {chapter.author}</span>
                        <div className="flex items-center gap-1">
                          <Vote className="h-3 w-3" />
                          <span>{chapter.votes} votes</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Interactive Graph Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Interactive Branch Visualization</CardTitle>
          <CardDescription>Coming soon: Interactive graph showing all story paths and connections</CardDescription>
        </CardHeader>
        <CardContent className="text-center py-12">
          <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <GitBranch className="h-12 w-12 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground mb-4">
            Interactive branch visualization will be available in the next update
          </p>
          <Button variant="outline">Request Feature</Button>
        </CardContent>
      </Card>
    </div>
  )
}
