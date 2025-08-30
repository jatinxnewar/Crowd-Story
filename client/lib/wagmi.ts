import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { mainnet, polygon, base, arbitrum } from "wagmi/chains";

export const wagmiConfig = getDefaultConfig({
	appName: "StoryDAO",
	projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "YOUR_PROJECT_ID_HERE",
	chains: [mainnet, polygon, base, arbitrum],
	ssr: false, // ✅ disable SSR for wagmi to speed up routing
});
