"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Users, Eye, Vote, Coins, Clock } from "lucide-react"
import Link from "next/link"
import { supabase } from "@/lib/supabaseClient"

const genres = ["All", "Sci-Fi", "Fantasy", "Romance", "Mystery", "Thriller", "Horror", "Adventure", "Cyberpunk"]

export default function ExplorePage() {

	const [stories, setStories] = useState<any[]>([])
	const [loading, setLoading] = useState(true)
	const [searchTerm, setSearchTerm] = useState("")
	const [selectedGenre, setSelectedGenre] = useState("All")
	const [sortBy, setSortBy] = useState("trending")
	const [activeTab, setActiveTab] = useState("stories")

	const filteredStories = stories.filter((story) => {
		const matchesSearch =
			story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			story.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
			story.author.toLowerCase().includes(searchTerm.toLowerCase())
		const matchesGenre = selectedGenre === "All" || story.genre === selectedGenre
		return matchesSearch && matchesGenre
	})
	useEffect(() => {
		const fetchStories = async () => {
			setLoading(true)
			const { data, error } = await supabase
				.from("stories")
				.select("*")
				.order("created_at", { ascending: false }) // adjust column name

			if (error) {
				console.error("Error fetching stories:", error)
			} else {
				setStories(data)
			}
			setLoading(false)
		}

		fetchStories()
	}, [])
	return (
		<div className="min-h-screen bg-background">
			<Navigation />

			<div className="container mx-auto px-4 py-8">
				{/* Header */}
				<div className="mb-8">
					<h1 className="font-serif text-4xl font-bold mb-2">Explore Stories</h1>
					<p className="text-lg text-muted-foreground">
						Discover amazing collaborative stories from the StoryDAO community
					</p>
				</div>

				{/* Search and Filters */}
				<div className="mb-8 space-y-4">
					<div className="flex flex-col md:flex-row gap-4">
						<div className="relative flex-1">
							<Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
							<Input
								placeholder="Search stories, authors, or descriptions..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="pl-10"
							/>
						</div>
						<Select value={selectedGenre} onValueChange={setSelectedGenre}>
							<SelectTrigger className="w-full md:w-48">
								<SelectValue placeholder="Select genre" />
							</SelectTrigger>
							<SelectContent>
								{genres.map((genre) => (
									<SelectItem key={genre} value={genre}>
										{genre}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						<Select value={sortBy} onValueChange={setSortBy}>
							<SelectTrigger className="w-full md:w-48">
								<SelectValue placeholder="Sort by" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="trending">Trending</SelectItem>
								<SelectItem value="newest">Newest</SelectItem>
								<SelectItem value="revenue">Highest Revenue</SelectItem>
								<SelectItem value="votes">Most Votes</SelectItem>
								<SelectItem value="followers">Most Followers</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>

				{/* Tabs for different content types */}
				<Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
					<TabsList className="grid w-full grid-cols-4">
						<TabsTrigger value="stories">Stories</TabsTrigger>
						<TabsTrigger value="proposals">Active Proposals</TabsTrigger>
						<TabsTrigger value="bounties">Bounties</TabsTrigger>
						<TabsTrigger value="authors">Top Authors</TabsTrigger>
					</TabsList>

					<TabsContent value="stories" className="mt-6">
						{/* Complete story grid */}
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{filteredStories.map((story) => (
								<Card key={story.id} className="hover:shadow-lg transition-shadow">
									<CardHeader className="pb-3">
										<div className="flex items-start justify-between">
											<span className="text-sm text-muted-foreground">
												{story.created_at ? new Date(story.created_at).toLocaleDateString() : ""}
											</span>
										</div>
										<CardTitle className="font-serif text-xl">{story.title}</CardTitle>
										<p className="text-sm text-muted-foreground line-clamp-2">{story.description}</p>
									</CardHeader>
									<CardContent>
										<div className="space-y-3">
											<div className="flex items-center justify-between text-sm">
												<span className="font-medium">by {story.author}</span>
												<Badge variant="outline">{story.genre}</Badge>
											</div>

											<div className="grid grid-cols-2 gap-4 text-sm">
												<div className="flex items-center gap-1">
													<Users className="h-4 w-4" />
													<span>{story.contributors?.length || 0} contributors</span>
												</div>
												<div className="flex items-center gap-1">
													<Vote className="h-4 w-4" />
													<span>{story.votes} votes</span>
												</div>
												<div className="flex items-center gap-1">
													<Eye className="h-4 w-4" />
													<span>{story.views} views</span>
												</div>
												<div className="flex items-center gap-1">
													<Coins className="h-4 w-4" />
													<span>{story.revenue}</span>
												</div>
											</div>

											<div className="flex flex-wrap gap-1">
												{story.tags.slice(0, 3).map((tag) => (
													<Badge key={tag} variant="secondary" className="text-xs">
														{tag}
													</Badge>
												))}
											</div>

											<div className="flex gap-2 pt-2">
												<Button asChild size="sm" className="flex-1">
													<Link href={`/story/${story.id}`}>Read Story</Link>
												</Button>
												<Button variant="outline" size="sm">
													Follow
												</Button>
											</div>
										</div>
									</CardContent>
								</Card>
							))}
						</div>
					</TabsContent>

					<TabsContent value="proposals" className="mt-6">
						{/* Proposals placeholder */}
						<div className="text-center py-12">
							<Clock className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
							<h3 className="text-lg font-semibold mb-2">Active Proposals</h3>
							<p className="text-muted-foreground">Chapter proposals currently being voted on</p>
						</div>
					</TabsContent>

					<TabsContent value="bounties" className="mt-6">
						{/* Bounties placeholder */}
						<div className="text-center py-12">
							<Coins className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
							<h3 className="text-lg font-semibold mb-2">Story Bounties</h3>
							<p className="text-muted-foreground">Earn rewards for contributing to stories</p>
						</div>
					</TabsContent>

					<TabsContent value="authors" className="mt-6">
						{/* Authors placeholder */}
						<div className="text-center py-12">
							<Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
							<h3 className="text-lg font-semibold mb-2">Top Authors</h3>
							<p className="text-muted-foreground">Most active and successful story creators</p>
						</div>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	)
}
