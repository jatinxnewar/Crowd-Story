"use client"

import { useState } from "react"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useAccount, useConnect, useDisconnect } from "wagmi"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Wallet, Shield, Zap, Users, CheckCircle, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function ConnectPage() {
  const { address, isConnected, chain } = useAccount()
  const { connectors, connect, isPending } = useConnect()
  const { disconnect } = useDisconnect()
  const [selectedConnector, setSelectedConnector] = useState<string | null>(null)

  const features = [
    {
      icon: Shield,
      title: "Secure & Decentralized",
      description: "Your wallet, your keys, your stories. Full control over your digital assets.",
    },
    {
      icon: Zap,
      title: "Instant Transactions",
      description: "Fast blockchain interactions for seamless story creation and voting.",
    },
    {
      icon: Users,
      title: "Community Governance",
      description: "Participate in DAO decisions and shape the future of storytelling.",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Connect Your Wallet</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Join the decentralized storytelling revolution. Connect your wallet to start creating, voting, and earning.
        </p>
      </div>

      {/* Connection Status */}
      {isConnected ? (
        <Alert className="mb-8 border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800 dark:text-green-200">
            <strong>Wallet Connected!</strong> You're ready to start using StoryDAO.
          </AlertDescription>
        </Alert>
      ) : (
        <Alert className="mb-8">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Connect your wallet to access all StoryDAO features including story creation, voting, and staking.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid md:grid-cols-2 gap-8">
        {/* Connection Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5" />
              Wallet Connection
            </CardTitle>
            <CardDescription>Choose your preferred wallet to get started</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isConnected ? (
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Connected Address</span>
                    <Badge variant="secondary">Connected</Badge>
                  </div>
                  <p className="text-sm font-mono break-all">{address}</p>
                  {chain && (
                    <div className="mt-2">
                      <span className="text-sm text-muted-foreground">Network: </span>
                      <Badge variant="outline">{chain.name}</Badge>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button asChild className="flex-1">
                    <a href="/create">Start Creating</a>
                  </Button>
                  <Button variant="outline" onClick={() => disconnect()} className="flex-1">
                    Disconnect
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <ConnectButton.Custom>
                  {({ openConnectModal }) => (
                    <Button onClick={openConnectModal} className="w-full" size="lg">
                      <Wallet className="mr-2 h-4 w-4" />
                      Connect Wallet
                    </Button>
                  )}
                </ConnectButton.Custom>

                <div className="text-center text-sm text-muted-foreground">
                  Supports MetaMask, WalletConnect, Coinbase Wallet, and more
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Features Panel */}
        <Card>
          <CardHeader>
            <CardTitle>Why Connect?</CardTitle>
            <CardDescription>Unlock the full potential of decentralized storytelling</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <div key={index} className="flex gap-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Next Steps */}
      {isConnected && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>What's Next?</CardTitle>
            <CardDescription>Start your journey in the StoryDAO ecosystem</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button asChild variant="outline" className="h-auto p-4 flex-col bg-transparent">
                <a href="/explore">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-2">
                    <Shield className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="font-medium">Explore Stories</span>
                  <span className="text-xs text-muted-foreground mt-1">Discover amazing collaborative stories</span>
                </a>
              </Button>

              <Button asChild variant="outline" className="h-auto p-4 flex-col bg-transparent">
                <a href="/create">
                  <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center mb-2">
                    <Zap className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <span className="font-medium">Create Story</span>
                  <span className="text-xs text-muted-foreground mt-1">Start your own collaborative story</span>
                </a>
              </Button>

              <Button asChild variant="outline" className="h-auto p-4 flex-col bg-transparent">
                <a href="/stake">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900 flex items-center justify-center mb-2">
                    <Users className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <span className="font-medium">Stake Tokens</span>
                  <span className="text-xs text-muted-foreground mt-1">Earn rewards by staking</span>
                </a>
              </Button>

              <Button asChild variant="outline" className="h-auto p-4 flex-col bg-transparent">
                <a href="/governance">
                  <div className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-900 flex items-center justify-center mb-2">
                    <CheckCircle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                  </div>
                  <span className="font-medium">Governance</span>
                  <span className="text-xs text-muted-foreground mt-1">Vote on DAO proposals</span>
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
