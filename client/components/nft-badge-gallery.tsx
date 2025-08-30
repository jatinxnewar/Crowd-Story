"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, Edit, Palette, Mic, ExternalLink, Search, Filter } from "lucide-react"

interface NFTBadge {
  id: number
  type: "Writing" | "Editing" | "Illustration" | "Narration"
  tokenId: string
  story: string
  chapter: string
  weight: number
  earned: string
  date: string
  rarity: "Common" | "Rare" | "Epic" | "Legendary"
}

const badgeIcons = {
  Writing: BookOpen,
  Editing: Edit,
  Illustration: Palette,
  Narration: Mic,
}

const badgeColors = {
  Writing: { color: "text-blue-600", bg: "bg-blue-100" },
  Editing: { color: "text-green-600", bg: "bg-green-100" },
  Illustration: { color: "text-purple-600", bg: "bg-purple-100" },
  Narration: { color: "text-orange-600", bg: "bg-orange-100" },
}

const rarityColors = {
  Common: "bg-gray-100 text-gray-800",
  Rare: "bg-blue-100 text-blue-800",
  Epic: "bg-purple-100 text-purple-800",
  Legendary: "bg-yellow-100 text-yellow-800",
}

interface NFTBadgeGalleryProps {
  badges: NFTBadge[]
}

export function NFTBadgeGallery({ badges }: NFTBadgeGalleryProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<string>("all")
  const [filterRarity, setFilterRarity] = useState<string>("all")

  const filteredBadges = badges.filter((badge) => {
    const matchesSearch =
      badge.story.toLowerCase().includes(searchTerm.toLowerCase()) ||
      badge.chapter.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || badge.type === filterType
    const matchesRarity = filterRarity === "all" || badge.rarity === filterRarity

    return matchesSearch && matchesType && matchesRarity
  })

  const badgeStats = {
    total: badges.length,
    writing: badges.filter((b) => b.type === "Writing").length,
    editing: badges.filter((b) => b.type === "Editing").length,
    illustration: badges.filter((b) => b.type === "Illustration").length,
    narration: badges.filter((b) => b.type === "Narration").length,
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">{badgeStats.total}</div>
            <div className="text-sm text-muted-foreground">Total Badges</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{badgeStats.writing}</div>
            <div className="text-sm text-muted-foreground">Writing</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{badgeStats.editing}</div>
            <div className="text-sm text-muted-foreground">Editing</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{badgeStats.illustration}</div>
            <div className="text-sm text-muted-foreground">Illustration</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{badgeStats.narration}</div>
            <div className="text-sm text-muted-foreground">Narration</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filter & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by story or chapter..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Writing">Writing</SelectItem>
                <SelectItem value="Editing">Editing</SelectItem>
                <SelectItem value="Illustration">Illustration</SelectItem>
                <SelectItem value="Narration">Narration</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterRarity} onValueChange={setFilterRarity}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by rarity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Rarities</SelectItem>
                <SelectItem value="Common">Common</SelectItem>
                <SelectItem value="Rare">Rare</SelectItem>
                <SelectItem value="Epic">Epic</SelectItem>
                <SelectItem value="Legendary">Legendary</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Badge Gallery */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBadges.map((badge) => {
          const Icon = badgeIcons[badge.type]
          const colors = badgeColors[badge.type]

          return (
            <Card key={badge.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${colors.bg}`}>
                    <Icon className={`h-6 w-6 ${colors.color}`} />
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="mb-1">
                      #{badge.tokenId}
                    </Badge>
                    <Badge className={rarityColors[badge.rarity]}>{badge.rarity}</Badge>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold">{badge.type} Badge</h3>
                    <p className="text-sm text-muted-foreground">{badge.story}</p>
                    <p className="text-xs text-muted-foreground">{badge.chapter}</p>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span>Weight: {badge.weight}</span>
                    <span className="font-medium text-primary">{badge.earned}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{badge.date}</span>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredBadges.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-muted-foreground">No badges found matching your search criteria.</div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
