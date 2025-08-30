import type React from "react"
import type { Metadata } from "next"
import { Work_Sans, Open_Sans } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"
import '@rainbow-me/rainbowkit/styles.css'
const workSans = Work_Sans({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-work-sans",
})

const openSans = Open_Sans({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-open-sans",
})

export const metadata: Metadata = {
	title: "StoryDAO - Decentralized Storytelling Platform",
	description: "Create, vote on, and monetize collaborative stories on the blockchain",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className={`${workSans.variable} ${openSans.variable}`} suppressHydrationWarning>
			<body className="antialiased app-theme">
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
