import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { BookOpen, Users, Vote, Coins, Clock, ArrowRight, PlusCircle } from "lucide-react"

// Mock data for featured stories
const featuredStories = [
  {
    id: 1,
    title: "The Quantum Chronicles",
    description: "A sci-fi epic about interdimensional travel and the consequences of altering reality.",
    author: "0x1234...5678",
    chapters: 12,
    contributors: 8,
    votes: 156,
    revenue: "2.4 ETH",
    status: "Active Voting",
    genre: "Sci-Fi",
  },
  {
    id: 2,
    title: "Shadows of the Old Kingdom",
    description: "A fantasy adventure following a group of unlikely heroes on a quest to save their realm.",
    author: "0x9876...5432",
    chapters: 8,
    contributors: 12,
    votes: 203,
    revenue: "1.8 ETH",
    status: "In Progress",
    genre: "Fantasy",
  },
  {
    id: 3,
    title: "Digital Hearts",
    description: "A cyberpunk romance exploring love and identity in a world where consciousness can be uploaded.",
    author: "0xabcd...efgh",
    chapters: 15,
    contributors: 6,
    votes: 89,
    revenue: "3.1 ETH",
    status: "Complete",
    genre: "Cyberpunk",
  },
]

const activeProposals = [
  {
    id: 1,
    story: "The Quantum Chronicles",
    chapter: "Chapter 13: The Paradox Unfolds",
    timeLeft: "2 days",
    votes: 45,
  },
  {
    id: 2,
    story: "Shadows of the Old Kingdom",
    chapter: "Chapter 9: The Dragon's Lair",
    timeLeft: "5 hours",
    votes: 78,
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6">
            Decentralized
            <span className="text-primary"> Storytelling</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Create, vote on, and monetize collaborative stories on the blockchain. Every contribution is rewarded, every
            voice matters.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/create">
                <PlusCircle className="mr-2 h-5 w-5" />
                Start a Story
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/explore">
                <BookOpen className="mr-2 h-5 w-5" />
                Explore Stories
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">1,247</div>
              <div className="text-sm text-muted-foreground">Active Stories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">8,932</div>
              <div className="text-sm text-muted-foreground">Contributors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">156.7</div>
              <div className="text-sm text-muted-foreground">ETH Distributed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">23,451</div>
              <div className="text-sm text-muted-foreground">Chapters Written</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Stories */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-3xl font-bold">Trending Stories</h2>
            <Button variant="outline" asChild>
              <Link href="/explore">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredStories.map((story) => (
              <Card key={story.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <Badge variant="secondary">{story.genre}</Badge>
                    <Badge variant={story.status === "Active Voting" ? "default" : "outline"}>{story.status}</Badge>
                  </div>
                  <CardTitle className="font-serif">{story.title}</CardTitle>
                  <CardDescription>{story.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center">
                      <BookOpen className="mr-1 h-4 w-4" />
                      {story.chapters} chapters
                    </div>
                    <div className="flex items-center">
                      <Users className="mr-1 h-4 w-4" />
                      {story.contributors} contributors
                    </div>
                    <div className="flex items-center">
                      <Vote className="mr-1 h-4 w-4" />
                      {story.votes} votes
                    </div>
                    <div className="flex items-center">
                      <Coins className="mr-1 h-4 w-4" />
                      {story.revenue}
                    </div>
                  </div>
                  <Button className="w-full" asChild>
                    <Link href={`/story/${story.id}`}>Read Story</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Active Proposals */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-3xl font-bold">Ending Soon Votes</h2>
            <Button variant="outline" asChild>
              <Link href="/explore">
                View All Proposals
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {activeProposals.map((proposal) => (
              <Card key={proposal.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{proposal.chapter}</CardTitle>
                  <CardDescription>From: {proposal.story}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="mr-1 h-4 w-4" />
                      {proposal.timeLeft} left
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Vote className="mr-1 h-4 w-4" />
                      {proposal.votes} votes
                    </div>
                  </div>
                  <Button className="w-full" asChild>
                    <Link href={`/story/${proposal.id}`}>Cast Vote</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="font-serif text-3xl font-bold mb-12">How It Works</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-semibold">Create & Propose</h3>
              <p className="text-muted-foreground">
                Start a new story or propose the next chapter. Set the rules and invite collaborators.
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Vote className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-semibold">Vote & Decide</h3>
              <p className="text-muted-foreground">
                Community votes on proposals. Your contribution history determines your voting power.
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Coins className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-semibold">Earn & Share</h3>
              <p className="text-muted-foreground">
                Get NFT badges for contributions and earn revenue when stories monetize.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <BookOpen className="h-5 w-5" />
                </div>
                <span className="font-serif text-xl font-bold">StoryDAO</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Decentralized storytelling platform where creativity meets blockchain technology.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/explore" className="hover:text-primary">
                    Explore
                  </Link>
                </li>
                <li>
                  <Link href="/create" className="hover:text-primary">
                    Create
                  </Link>
                </li>
                <li>
                  <Link href="/bounties" className="hover:text-primary">
                    Bounties
                  </Link>
                </li>
                <li>
                  <Link href="/marketplace" className="hover:text-primary">
                    Marketplace
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Community</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/governance" className="hover:text-primary">
                    Governance
                  </Link>
                </li>
                <li>
                  <Link href="/explore" className="hover:text-primary">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/explore" className="hover:text-primary">
                    Help Center
                  </Link>
                </li>
                <li>
                  <a
                    href="https://discord.gg/storydao"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary"
                  >
                    Discord
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/explore" className="hover:text-primary">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/explore" className="hover:text-primary">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/explore" className="hover:text-primary">
                    Smart Contracts
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 StoryDAO. Built on the blockchain for creators, by creators.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
