"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Save, Eye, Send, Users, Star, PlusCircle } from "lucide-react"
import { useAccount } from "wagmi"
import { useContributionNFT } from "@/hooks/use-contract"
import { CONTRIBUTION_TYPES } from "@/lib/contracts"

// Mock data for user's stories
const userStories = [
	{
		id: 1,
		title: "The Quantum Chronicles",
		status: "Active",
		chapters: 12,
		lastUpdated: "2 days ago",
		role: "Creator",
	},
	{
		id: 2,
		title: "Shadows of the Old Kingdom",
		status: "In Progress",
		chapters: 8,
		lastUpdated: "1 week ago",
		role: "Contributor",
	},
]

const contributionTypes = [
	{ value: "writing", label: "Writing", icon: BookOpen, description: "Original story content and narrative" },
	{ value: "editing", label: "Editing", icon: Eye, description: "Proofreading and content refinement" },
	{ value: "illustration", label: "Illustration", icon: Star, description: "Visual artwork and graphics" },
	{ value: "narration", label: "Narration", icon: Users, description: "Voice acting and audio content" },
]

export default function WritePage() {
	const { address, isConnected } = useAccount()
	const { mintContribution, isPending, isSuccess, error } = useContributionNFT()

	const [activeTab, setActiveTab] = useState("write")
	const [selectedStory, setSelectedStory] = useState("")
	const [chapterTitle, setChapterTitle] = useState("")
	const [chapterContent, setChapterContent] = useState("")
	const [contributionType, setContributionType] = useState("writing")
	const [isProposal, setIsProposal] = useState(true)
	const [wordCount, setWordCount] = useState(0)
	const [estimatedReadTime, setEstimatedReadTime] = useState(0)
	const [isDraft, setIsDraft] = useState(false)

	// Calculate word count and reading time
	useEffect(() => {
		const words = chapterContent
			.trim()
			.split(/\s+/)
			.filter((word) => word.length > 0).length
		setWordCount(words)
		setEstimatedReadTime(Math.ceil(words / 200)) // Average reading speed: 200 words per minute
	}, [chapterContent])

	const handleSaveDraft = () => {
		console.log("[v0] Saving draft:", {
			storyId: selectedStory,
			title: chapterTitle,
			content: chapterContent,
			type: contributionType,
		})
		setIsDraft(true)
		// In a real app, this would save to local storage or backend
	}

	const handleSubmitContribution = async () => {
		if (!selectedStory || !chapterTitle || !chapterContent) {
			alert("Please fill in all required fields")
			return
		}

		if (!isConnected || !address) {
			console.log("[v0] Demo mode: Simulating contribution submission:", {
				storyId: selectedStory,
				title: chapterTitle,
				content: chapterContent,
				type: contributionType,
				isProposal,
			})

			// Simulate successful submission
			setTimeout(() => {
				alert("Demo: Contribution submitted successfully! (Connect wallet for real blockchain interaction)")
				setChapterTitle("")
				setChapterContent("")
				setIsDraft(false)
			}, 1000)
			return
		}

		try {
			console.log("[v0] Submitting contribution:", {
				storyId: selectedStory,
				title: chapterTitle,
				content: chapterContent,
				type: contributionType,
				isProposal,
			})

			const contributionTypeId = CONTRIBUTION_TYPES[contributionType.toUpperCase() as keyof typeof CONTRIBUTION_TYPES]

			// Create metadata URI (in real app, this would upload to IPFS)
			const metadata = {
				title: chapterTitle,
				content: chapterContent,
				contributionType,
				wordCount,
				timestamp: new Date().toISOString(),
			}
			const metadataURI = `ipfs://mock-contribution-${Date.now()}`

			await mintContribution({
				to: address,
				storyId: BigInt(selectedStory),
				chapterId: BigInt(Date.now()), // Mock chapter ID
				contributionType: contributionTypeId,
				weight: BigInt(wordCount), // Use word count as weight
				metadataURI,
			})

			console.log("[v0] Contribution NFT minting transaction submitted")

			// Reset form on success
			setChapterTitle("")
			setChapterContent("")
			setIsDraft(false)
		} catch (error) {
			console.error("[v0] Error submitting contribution:", error)
			alert("Error submitting contribution. Please try again.")
		}
	}

	const handlePreview = () => {
		// Open preview modal or navigate to preview page
		console.log("[v0] Opening preview for:", chapterTitle)
	}

	if (isSuccess) {
		setTimeout(() => {
			alert("Contribution submitted successfully! You've received a contribution NFT.")
		}, 1000)
	}

	return (
		<div className="min-h-screen bg-background">
			<Navigation />

			<div className="container mx-auto px-4 py-8">
				<div className="max-w-6xl mx-auto">
					{/* Header */}
					<div className="mb-8">
						<h1 className="font-serif text-3xl font-bold mb-2">Story Writing Studio</h1>
						<p className="text-muted-foreground">Create and contribute to collaborative stories on the blockchain</p>
						{!isConnected && (
							<div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
								<p className="text-sm text-blue-800 dark:text-blue-200">
									<strong>Demo Mode:</strong> You can explore the writing interface. Connect your wallet to submit real
									contributions to the blockchain.
								</p>
							</div>
						)}
					</div>

					<Tabs value={activeTab} onValueChange={setActiveTab}>
						<TabsList className="grid w-full grid-cols-3">
							<TabsTrigger value="write">Write</TabsTrigger>
							<TabsTrigger value="drafts">My Drafts</TabsTrigger>
							<TabsTrigger value="contributions">My Contributions</TabsTrigger>
						</TabsList>

						{/* Write Tab */}
						<TabsContent value="write" className="space-y-6">
							<div className="grid lg:grid-cols-3 gap-6">
								{/* Main Writing Area */}
								<div className="lg:col-span-2 space-y-6">
									<Card>
										<CardHeader>
											<CardTitle>New Contribution</CardTitle>
											<CardDescription>Write your chapter or contribution to a story</CardDescription>
										</CardHeader>
										<CardContent className="space-y-4">
											{/* Story Selection */}
											<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
												<div className="space-y-2">
													<Label htmlFor="story">Select Story</Label>
													<Select value={selectedStory} onValueChange={setSelectedStory}>
														<SelectTrigger>
															<SelectValue placeholder="Choose a story to contribute to" />
														</SelectTrigger>
														<SelectContent className="bg-white dark:bg-gray-900 border border-border rounded-md shadow-lg">
															{userStories.map((story) => (
																<SelectItem key={story.id} value={story.id.toString()}>
																	{story.title} ({story.role})
																</SelectItem>
															))}
														</SelectContent>
													</Select>
												</div>

												<div className="space-y-2">
													<Label htmlFor="contribution-type">Contribution Type</Label>
													<Select value={contributionType} onValueChange={setContributionType}>
														<SelectTrigger>
															<SelectValue />
														</SelectTrigger>
														<SelectContent className="bg-white dark:bg-gray-900 border border-border rounded-md shadow-lg">
															{contributionTypes.map((type) => (
																<SelectItem key={type.value} value={type.value}>
																	{type.label}
																</SelectItem>
															))}
														</SelectContent>
													</Select>
												</div>
											</div>

											{/* Chapter Title */}
											<div className="space-y-2">
												<Label htmlFor="title">Chapter/Contribution Title</Label>
												<Input
													id="title"
													placeholder="Enter a compelling title for your contribution"
													value={chapterTitle}
													onChange={(e) => setChapterTitle(e.target.value)}
												/>
											</div>

											{/* Writing Area */}
											<div className="space-y-2">
												<Label htmlFor="content">Content</Label>
												<Textarea
													id="content"
													placeholder="Start writing your story contribution here..."
													value={chapterContent}
													onChange={(e) => setChapterContent(e.target.value)}
													rows={20}
													className="min-h-[500px] font-mono text-sm leading-relaxed"
												/>
											</div>

											{/* Writing Stats */}
											<div className="flex items-center justify-between text-sm text-muted-foreground bg-muted p-3 rounded-lg">
												<div className="flex items-center gap-4">
													<span>{wordCount} words</span>
													<span>•</span>
													<span>{estimatedReadTime} min read</span>
													<span>•</span>
													<span>{chapterContent.length} characters</span>
												</div>
												{isDraft && (
													<Badge variant="secondary">
														<Save className="mr-1 h-3 w-3" />
														Draft Saved
													</Badge>
												)}
											</div>

											{/* Action Buttons */}
											<div className="flex items-center justify-between">
												<div className="flex items-center gap-2">
													<Button variant="outline" onClick={handleSaveDraft}>
														<Save className="mr-2 h-4 w-4" />
														Save Draft
													</Button>
													<Button variant="outline" onClick={handlePreview}>
														<Eye className="mr-2 h-4 w-4" />
														Preview
													</Button>
												</div>

												<Button
													onClick={handleSubmitContribution}
													disabled={isPending || !selectedStory || !chapterTitle || !chapterContent}
												>
													<Send className="mr-2 h-4 w-4" />
													{isPending
														? "Submitting..."
														: isConnected
															? isProposal
																? "Submit Proposal"
																: "Submit Contribution"
															: "Submit (Demo)"}
												</Button>
											</div>

											{/* Error Display */}
											{error && (
												<div className="p-3 bg-red-50 border border-red-200 rounded-lg mt-4">
													<p className="text-sm text-red-800">Error: {error.message}</p>
												</div>
											)}
										</CardContent>
									</Card>
								</div>

								{/* Sidebar */}
								<div className="space-y-6">
									{/* Contribution Type Info */}
									<Card>
										<CardHeader>
											<CardTitle className="text-lg">Contribution Type</CardTitle>
										</CardHeader>
										<CardContent>
											{contributionTypes.map((type) => (
												<div
													key={type.value}
													className={`p-3 rounded-lg border cursor-pointer transition-colors ${contributionType === type.value
														? "border-primary bg-primary/5"
														: "border-border hover:bg-muted/50"
														}`}
													onClick={() => setContributionType(type.value)}
												>
													<div className="flex items-center gap-2 mb-1">
														<type.icon className="h-4 w-4" />
														<span className="font-medium">{type.label}</span>
													</div>
													<p className="text-xs text-muted-foreground">{type.description}</p>
												</div>
											))}
										</CardContent>
									</Card>

									{/* Writing Tips */}
									<Card>
										<CardHeader>
											<CardTitle className="text-lg">Writing Tips</CardTitle>
										</CardHeader>
										<CardContent className="space-y-3">
											<div className="text-sm space-y-2">
												<p>• Stay consistent with the story's established lore and tone</p>
												<p>• Aim for 1,000-3,000 words per chapter</p>
												<p>• End with a hook to keep readers engaged</p>
												<p>• Consider how your chapter advances the plot</p>
												<p>• Review community feedback on previous chapters</p>
											</div>
										</CardContent>
									</Card>

									{/* Rewards Info */}
									<Card>
										<CardHeader>
											<CardTitle className="text-lg">Contribution Rewards</CardTitle>
										</CardHeader>
										<CardContent className="space-y-3">
											<div className="flex items-center justify-between">
												<span className="text-sm">NFT Badge</span>
												<Badge variant="secondary">Guaranteed</Badge>
											</div>
											<div className="flex items-center justify-between">
												<span className="text-sm">Revenue Share</span>
												<Badge variant="secondary">If Accepted</Badge>
											</div>
											<div className="flex items-center justify-between">
												<span className="text-sm">Voting Power</span>
												<Badge variant="secondary">Weighted</Badge>
											</div>
											<Separator />
											<p className="text-xs text-muted-foreground">
												Contributions are rewarded based on community acceptance and story success.
											</p>
										</CardContent>
									</Card>
								</div>
							</div>
						</TabsContent>

						{/* Drafts Tab */}
						<TabsContent value="drafts" className="space-y-6">
							<Card>
								<CardHeader>
									<CardTitle>Saved Drafts</CardTitle>
									<CardDescription>Your work-in-progress contributions</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="text-center py-8 text-muted-foreground">
										<BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
										<p>No drafts saved yet</p>
										<p className="text-sm">Start writing to create your first draft</p>
									</div>
								</CardContent>
							</Card>
						</TabsContent>

						{/* Contributions Tab */}
						<TabsContent value="contributions" className="space-y-6">
							<Card>
								<CardHeader>
									<CardTitle>My Contributions</CardTitle>
									<CardDescription>Track your submitted contributions and their status</CardDescription>
								</CardHeader>
								<CardContent>
									<div className="text-center py-8 text-muted-foreground">
										<PlusCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
										<p>No contributions yet</p>
										<p className="text-sm">Submit your first contribution to get started</p>
									</div>
								</CardContent>
							</Card>
						</TabsContent>
					</Tabs>
				</div>
			</div>
		</div>
	)
}
