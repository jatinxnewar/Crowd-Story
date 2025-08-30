"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { WalletConnectButton } from "@/components/wallet-connect-button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { BookOpen, PlusCircle, Trophy, Bell, User, Settings, Edit, Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

const navigation = [
	{ name: "Explore", href: "/explore", icon: BookOpen },
	{ name: "Create", href: "/create", icon: PlusCircle },
	{ name: "Write", href: "/write", icon: Edit },
	{ name: "Stake", href: "/stake", icon: Trophy },
]

export function Navigation() {
	const pathname = usePathname()
	const [mobileOpen, setMobileOpen] = useState(false)

	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container flex h-16 items-center justify-between">
				{/* Logo */}
				<Link href="/" className="flex items-center space-x-2">
					<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
						<BookOpen className="h-5 w-5" />
					</div>
					<span className="font-serif text-xl font-bold">StoryDAO</span>
				</Link>

				{/* Desktop Navigation */}
				<nav className="hidden md:flex items-center space-x-6">
					{navigation.map((item) => {
						const Icon = item.icon
						return (
							<Link
								key={item.name}
								href={item.href}
								className={cn(
									"flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary",
									pathname === item.href ? "text-primary" : "text-muted-foreground",
								)}
							>
								<Icon className="h-4 w-4" />
								<span>{item.name}</span>
							</Link>
						)
					})}
				</nav>

				{/* Right Side Actions */}
				<div className="flex items-center space-x-2 md:space-x-4">
					{/* Theme Toggle */}
					<ThemeToggle />

					{/* Notifications */}
					<Button variant="ghost" size="sm" className="relative">
						<Bell className="h-4 w-4" />
						<Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">
							3
						</Badge>
					</Button>

					{/* Profile Menu */}
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" size="sm">
								<User className="h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							align="end"
							className="w-56 bg-white dark:bg-neutral-900 shadow-lg border border-gray-200 dark:border-gray-700 rounded-lg"
						>
							<DropdownMenuItem asChild>
								<Link href="/write">
									<Edit className="mr-2 h-4 w-4" />
									My Contributions
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem asChild>
								<Link href="/stake">
									<Trophy className="mr-2 h-4 w-4" />
									My Stakes
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem asChild>
								<Link href="/profile">
									<Settings className="mr-2 h-4 w-4" />
									Profile Settings
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem>Sign out</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>

					{/* Wallet Connect */}
					<WalletConnectButton />

					{/* Mobile Hamburger */}
					<button
						className="md:hidden p-2 rounded-lg hover:bg-accent"
						onClick={() => setMobileOpen(!mobileOpen)}
					>
						<Menu className="h-5 w-5" />
					</button>
				</div>
			</div>

			{/* Mobile Nav */}
			{mobileOpen && (
				<div className="md:hidden border-t bg-background/95 backdrop-blur">
					<nav className="flex flex-col space-y-2 p-4">
						{navigation.map((item) => {
							const Icon = item.icon
							return (
								<Link
									key={item.name}
									href={item.href}
									className={cn(
										"flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary",
										pathname === item.href ? "text-primary" : "text-muted-foreground",
									)}
									onClick={() => setMobileOpen(false)}
								>
									<Icon className="h-4 w-4" />
									<span>{item.name}</span>
								</Link>
							)
						})}
					</nav>
				</div>
			)}
		</header>
	)
}
