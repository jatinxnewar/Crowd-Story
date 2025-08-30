"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { BookOpen, Clock, Coins, Eye, Heart, Search, Gavel, ShoppingBag } from "lucide-react"

// Mock marketplace data
const storyLicenses = [
  {
    id: 1,
    title: "The Quantum Chronicles",
    description: "Complete sci-fi series with 12 chapters and rich world-building",
    author: "QuantumWriter",
    genre: "Sci-Fi",
    type: "Full Story Rights",
    price: "5.0 ETH",
    reservePrice: "3.0 ETH",
    currentBid: "4.2 ETH",
    timeLeft: "2 days, 14 hours",
    bidders: 8,
    views: 342,
    likes: 89,
    chapters: 12,
    wordCount: 45000,
    status: "Active Auction",
    image: "/sci-fi-book-cover.png",
  },
  {
    id: 2,
    title: "Digital Hearts",
    description: "Cyberpunk romance exploring love in a digital age",
    author: "CyberRomancer",
    genre: "Cyberpunk",
    type: "Print Rights",
    price: "2.5 ETH",
    reservePrice: "1.5 ETH",
    currentBid: "2.1 ETH",
    timeLeft: "5 days, 3 hours",
    bidders: 12,
    views: 567,
    likes: 134,
    chapters: 8,
    wordCount: 32000,
    status: "Active Auction",
    image: "/cyberpunk-romance-book.png",
  },
  {
    id: 3,
    title: "Shadows of the Old Kingdom",
    description: "Epic fantasy adventure with detailed character development",
    author: "FantasyMaster",
    genre: "Fantasy",
    type: "Streaming Rights",
    price: "8.0 ETH",
    reservePrice: "5.0 ETH",
    currentBid: "6.5 ETH",
    timeLeft: "1 day, 18 hours",
    bidders: 15,
    views: 892,
    likes: 203,
    chapters: 15,
    wordCount: 67000,
    status: "Active Auction",
    image: "/fantasy-kingdom-book-cover.png",
  },
]

const characterAssets = [
  {
    id: 1,
    name: "Dr. Elena Vasquez",
    story: "The Quantum Chronicles",
    type: "Character Rights",
    price: "1.2 ETH",
    description: "Brilliant quantum physicist and main protagonist",
    traits: ["Intelligent", "Determined", "Empathetic"],
    image: "/female-scientist.png",
  },
  {
    id: 2,
    name: "The Quantum Device",
    story: "The Quantum Chronicles",
    type: "Asset Rights",
    price: "0.8 ETH",
    description: "Interdimensional travel device with unique properties",
    traits: ["Sci-Fi", "Technology", "Plot Device"],
    image: "/quantum-device-sci-fi.png",
  },
]

export default function MarketplacePage() {
  const [activeTab, setActiveTab] = useState("stories")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterGenre, setFilterGenre] = useState("all")
  const [filterType, setFilterType] = useState("all")
  const [sortBy, setSortBy] = useState("ending-soon")

  const handlePlaceBid = (itemId: number, currentBid: string) => {
    console.log("[v0] Placing bid on item:", itemId, "Current bid:", currentBid)
    alert("Bid placed successfully! (This is a demo)")
  }

  const handleBuyNow = (itemId: number, price: string) => {
    console.log("[v0] Buying item:", itemId, "Price:", price)
    alert("Purchase successful! (This is a demo)")
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif text-4xl font-bold mb-2">Marketplace</h1>
          <p className="text-lg text-muted-foreground">
            Discover and license stories, characters, and assets from the StoryDAO community
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">127</div>
              <div className="text-sm text-muted-foreground">Active Listings</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">45.7 ETH</div>
              <div className="text-sm text-muted-foreground">Total Volume</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">892</div>
              <div className="text-sm text-muted-foreground">Total Sales</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">234</div>
              <div className="text-sm text-muted-foreground">Active Bidders</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search stories, characters, or assets..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={filterGenre} onValueChange={setFilterGenre}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Genre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Genres</SelectItem>
                  <SelectItem value="sci-fi">Sci-Fi</SelectItem>
                  <SelectItem value="fantasy">Fantasy</SelectItem>
                  <SelectItem value="cyberpunk">Cyberpunk</SelectItem>
                  <SelectItem value="romance">Romance</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="License Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="full-rights">Full Story Rights</SelectItem>
                  <SelectItem value="print">Print Rights</SelectItem>
                  <SelectItem value="streaming">Streaming Rights</SelectItem>
                  <SelectItem value="character">Character Rights</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ending-soon">Ending Soon</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="most-bids">Most Bids</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="stories">Story Licenses</TabsTrigger>
            <TabsTrigger value="characters">Characters & Assets</TabsTrigger>
            <TabsTrigger value="my-listings">My Listings</TabsTrigger>
          </TabsList>

          {/* Story Licenses */}
          <TabsContent value="stories" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {storyLicenses.map((story) => (
                <Card key={story.id} className="hover:shadow-lg transition-shadow">
                  <div className="aspect-video relative overflow-hidden rounded-t-lg">
                    <img
                      src={story.image || "/placeholder.svg"}
                      alt={story.title}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-2 right-2">{story.status}</Badge>
                  </div>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{story.title}</CardTitle>
                        <CardDescription>{story.description}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{story.genre}</Badge>
                      <Badge variant="outline">{story.type}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        <span>{story.chapters} chapters</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        <span>{story.views} views</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Gavel className="h-4 w-4" />
                        <span>{story.bidders} bidders</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="h-4 w-4" />
                        <span>{story.likes} likes</span>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Current Bid</span>
                        <span className="font-bold text-primary">{story.currentBid}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Buy Now</span>
                        <span className="font-bold">{story.price}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{story.timeLeft} remaining</span>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        className="flex-1 bg-transparent"
                        onClick={() => handlePlaceBid(story.id, story.currentBid)}
                      >
                        <Gavel className="mr-2 h-4 w-4" />
                        Place Bid
                      </Button>
                      <Button className="flex-1" onClick={() => handleBuyNow(story.id, story.price)}>
                        <ShoppingBag className="mr-2 h-4 w-4" />
                        Buy Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Characters & Assets */}
          <TabsContent value="characters" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {characterAssets.map((asset) => (
                <Card key={asset.id} className="hover:shadow-lg transition-shadow">
                  <div className="aspect-square relative overflow-hidden rounded-t-lg">
                    <img
                      src={asset.image || "/placeholder.svg"}
                      alt={asset.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{asset.name}</CardTitle>
                    <CardDescription>{asset.story}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{asset.description}</p>

                    <div className="flex flex-wrap gap-1">
                      {asset.traits.map((trait) => (
                        <Badge key={trait} variant="outline" className="text-xs">
                          {trait}
                        </Badge>
                      ))}
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">{asset.type}</Badge>
                      <span className="font-bold text-primary">{asset.price}</span>
                    </div>

                    <Button className="w-full">
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      Purchase License
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* My Listings */}
          <TabsContent value="my-listings" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>My Marketplace Listings</CardTitle>
                    <CardDescription>Manage your stories and assets for sale</CardDescription>
                  </div>
                  <Button>
                    <Coins className="mr-2 h-4 w-4" />
                    Create Listing
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">No listings yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Start monetizing your stories by creating your first marketplace listing.
                  </p>
                  <Button>Create Your First Listing</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
