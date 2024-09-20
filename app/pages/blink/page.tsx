"use client"

import React, { useState, useEffect } from 'react'
import CreateBlink from './create-blink'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useWallet, useConnection } from '@solana/wallet-adapter-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, BarChart2, PlusCircle, Settings, Loader2, Search, RefreshCw } from 'lucide-react'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import Image from 'next/image'

const BlinkDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview")
  const { connected, publicKey } = useWallet()
  const { connection } = useConnection()
  const [balance, setBalance] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  const mockBlinks = [
    { id: 1, title: "Digital Art Collection", sales: 12, revenue: 5.4 },
    { id: 2, title: "Music Album NFT", sales: 8, revenue: 3.2 },
    { id: 3, title: "Virtual Real Estate", sales: 3, revenue: 15.0 },
  ]

  const filteredBlinks = mockBlinks.filter(blink => 
    blink.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  useEffect(() => {
    fetchBalance()
  }, [publicKey, connection])

  const fetchBalance = async () => {
    setLoading(true)
    if (publicKey) {
      try {
        const balance = await connection.getBalance(publicKey)
        setBalance(balance / LAMPORTS_PER_SOL)
      } catch (error) {
        console.error("Failed to fetch balance:", error)
        setBalance(null)
      }
    } else {
      setBalance(null)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sand-100 to-sand-200">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="mb-8 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-gray-800 to-gray-900 text-white">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Image src="https://ucarecdn.com/74392932-2ff5-4237-a1fa-e0fd15725ecc/bark.svg" alt="Blink Logo" width={40} height={40} className="mr-3" />
                  <div>
                    <CardTitle className="text-3xl font-bold">Blink Dashboard</CardTitle>
                    <CardDescription className="text-gray-300">Manage and track your digital assets</CardDescription>
                  </div>
                </div>
                <WalletMultiButton className="bg-sand-500 hover:bg-sand-600 text-black" />
              </div>
            </CardHeader>
            <CardContent className="p-6 bg-white">
              {connected && (
                <div className="mb-4 p-4 bg-sand-100 rounded-lg flex justify-between items-center">
                  <p className="text-gray-700">
                    Wallet Balance: 
                    {loading ? (
                      <Loader2 className="inline ml-2 h-4 w-4 animate-spin" />
                    ) : (
                      <span className="font-bold ml-2">{balance !== null ? `${balance.toFixed(2)} SOL` : 'Unable to fetch balance'}</span>
                    )}
                  </p>
                  <Button onClick={fetchBalance} variant="outline" size="sm" className="ml-2">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh
                  </Button>
                </div>
              )}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                <TabsList className="grid w-full grid-cols-4 bg-sand-100">
                  <TabsTrigger value="overview" className="data-[state=active]:bg-sand-200">Overview</TabsTrigger>
                  <TabsTrigger value="create" className="data-[state=active]:bg-sand-200">Create Blink</TabsTrigger>
                  <TabsTrigger value="analytics" className="data-[state=active]:bg-sand-200">Analytics</TabsTrigger>
                  <TabsTrigger value="settings" className="data-[state=active]:bg-sand-200">Settings</TabsTrigger>
                </TabsList>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <TabsContent value="overview">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-2xl font-semibold flex items-center text-gray-800">
                            <Sparkles className="mr-2 h-5 w-5 text-sand-500" />
                            Your Blinks
                          </CardTitle>
                          <div className="mt-2">
                            <Label htmlFor="search" className="sr-only">Search Blinks</Label>
                            <div className="relative">
                              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                              <Input
                                id="search"
                                type="text"
                                placeholder="Search your Blinks..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-8"
                              />
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          {connected ? (
                            <div className="space-y-4">
                              {filteredBlinks.length > 0 ? (
                                filteredBlinks.map((blink) => (
                                  <Card key={blink.id}>
                                    <CardContent className="flex justify-between items-center p-4">
                                      <div>
                                        <h3 className="font-semibold text-gray-800">{blink.title}</h3>
                                        <p className="text-sm text-gray-500">{blink.sales} sales</p>
                                      </div>
                                      <p className="font-bold text-sand-600">{blink.revenue} SOL</p>
                                    </CardContent>
                                  </Card>
                                ))
                              ) : (
                                <p className="text-center py-4 text-gray-500">No Blinks found matching your search.</p>
                              )}
                            </div>
                          ) : (
                            <p className="text-center py-4 text-gray-500">Connect your wallet to view your Blinks</p>
                          )}
                        </CardContent>
                        <CardFooter>
                          <Button onClick={() => setActiveTab("create")} className="w-full bg-sand-500 hover:bg-sand-600 text-black">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Create New Blink
                          </Button>
                        </CardFooter>
                      </Card>
                    </TabsContent>
                    <TabsContent value="create">
                      <CreateBlink />
                    </TabsContent>
                    <TabsContent value="analytics">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-2xl font-semibold flex items-center text-gray-800">
                            <BarChart2 className="mr-2 h-5 w-5 text-sand-500" />
                            Analytics
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-center py-4 text-gray-500">Analytics feature coming soon!</p>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    <TabsContent value="settings">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-2xl font-semibold flex items-center text-gray-800">
                            <Settings className="mr-2 h-5 w-5 text-sand-500" />
                            Settings
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-center py-4 text-gray-500">Settings feature coming soon!</p>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </motion.div>
                </AnimatePresence>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default BlinkDashboard