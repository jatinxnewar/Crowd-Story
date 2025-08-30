"use client"

import type React from "react"
import { useTheme } from "next-themes"
import { WagmiProvider } from "wagmi"
import { RainbowKitProvider, lightTheme, darkTheme } from "@rainbow-me/rainbowkit"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { wagmiConfig } from "@/lib/wagmi"

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
			refetchOnWindowFocus: false,
			refetchOnMount: false,
			refetchOnReconnect: false,
		},
	},
})

function RainbowKitThemeProvider({ children }: { children: React.ReactNode }) {
	const { theme } = useTheme()
	const rainbowKitTheme = theme === "dark" ? darkTheme() : lightTheme()

	return (
		<RainbowKitProvider theme={darkTheme({
			accentColor: '#6366f1',
			borderRadius: 'large',
			fontStack: 'system',
		})}>
			{children}
		</RainbowKitProvider>
	)
}

export function WalletProvider({ children }: { children: React.ReactNode }) {
	return (
		<WagmiProvider config={wagmiConfig}>
			<QueryClientProvider client={queryClient}>
				<RainbowKitThemeProvider>{children}</RainbowKitThemeProvider>
			</QueryClientProvider>
		</WagmiProvider>
	)
}
