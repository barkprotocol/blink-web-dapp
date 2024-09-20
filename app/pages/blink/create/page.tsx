"use client"

import React, { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { clusterApiUrl } from '@solana/web3.js'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Upload, ArrowLeft, Link as LinkIcon, Wallet, Info } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

require('@solana/wallet-adapter-react-ui')

interface FormData {
  title: string
  description: string
  category: string
  price: string
  image: File | null
  linkUrl: string
}

const network = WalletAdapterNetwork.Devnet
const CREATION_FEE_PERCENTAGE = 2.8
const FEE_RECIPIENT_WALLET = new PublicKey("gEb7nD9yLkau1P4uyMdke9byJNrat61suH4vYiPUuiR")

export default function CreateBlink() {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    category: '',
    price: '',
    image: null,
    linkUrl: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [creationFee, setCreationFee] = useState(0)

  const router = useRouter()
  const { connection } = useConnection()
  const { publicKey, sendTransaction, wallet } = useWallet()

  const endpoint = useMemo(() => clusterApiUrl(network), [network])

  const walletAdapters = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
    ],
    []
  )

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const price = parseFloat(formData.price)
    if (!isNaN(price)) {
      const fee = price * (CREATION_FEE_PERCENTAGE / 100)
      setCreationFee(fee)
    } else {
      setCreationFee(0)
    }
  }, [formData.price])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string,
    field: keyof FormData
  ) => {
    const value = typeof e === 'string' ? e : e.target.value
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, image: e.target.files![0] }))
    }
  }

  const handleSolanaTransaction = async () => {
    if (!publicKey) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your Solana wallet to create a Blink.",
        variant: "destructive",
      })
      return false
    }

    try {
      const price = parseFloat(formData.price)
      const feeAmount = Math.floor(price * LAMPORTS_PER_SOL * (CREATION_FEE_PERCENTAGE / 100))

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: FEE_RECIPIENT_WALLET,
          lamports: feeAmount,
        })
      )

      const signature = await sendTransaction(transaction, connection)
      await connection.confirmTransaction(signature, 'processed')

      toast({
        title: "Transaction Successful",
        description: "Your Solana transaction was successful.",
      })

      return true
    } catch (error) {
      console.error("Error in Solana transaction:", error)
      toast({
        title: "Transaction Failed",
        description: "There was an error processing your Solana transaction.",
        variant: "destructive",
      })
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setIsSubmitting(true)

    const transactionSuccess = await handleSolanaTransaction()
    if (!transactionSuccess) {
      setIsSubmitting(false)
      return
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1000))

      toast({
        title: "Blink Created",
        description: "Your new Blink has been successfully created and listed.",
      })

      setFormData({ title: '', description: '', category: '', price: '', image: null, linkUrl: '' })
      router.push('/dashboard')
    } catch (error) {
      console.error("Error creating Blink:", error)
      toast({
        title: "Error",
        description: "There was an error creating your Blink. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChangeWallet = () => {
    if (wallet) {
      wallet.adapter.disconnect()
    }
  }

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={walletAdapters} autoConnect>
        <WalletModalProvider>
          <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-12 px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl mx-auto"
            >
              <Button
                variant="ghost"
                onClick={() => router.back()}
                className="mb-4 text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
              <Card className="w-full shadow-lg">
                <CardHeader className="bg-gradient-to-r from-gray-800 to-gray-900 text-white">
                  <CardTitle className="text-3xl font-bold">Create Your Blink</CardTitle>
                  <CardDescription className="text-gray-300">Bring your digital asset to life</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="mb-6 space-y-4">
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
                      <div className="flex items-center">
                        <Info className="h-5 w-5 text-blue-400 mr-2" />
                        <p className="text-sm text-blue-700">
                          Creating a Blink incurs a {CREATION_FEE_PERCENTAGE}% fee. This fee helps maintain the platform and support creators.
                        </p>
                      </div>
                    </div>
                    <Label htmlFor="wallet-connect" className="block text-sm font-medium text-gray-700">
                      Wallet Connection
                    </Label>
                    <div className="flex items-center space-x-4">
                      <WalletMultiButton className="!bg-gray-800 hover:!bg-gray-700 text-white" />
                      {wallet ? (
                        <Button 
                          onClick={handleChangeWallet} 
                          variant="outline"
                          className="flex items-center"
                        >
                          <Wallet className="mr-2 h-4 w-4" />
                          Change Wallet
                        </Button>
                      ) : (
                        <p className="text-sm text-gray-600">Select Wallet to continue</p>
                      )}
                    </div>
                    {publicKey && (
                      <p className="text-sm text-gray-600">
                        Connected: {publicKey.toBase58().slice(0, 4)}...{publicKey.toBase58().slice(-4)}
                      </p>
                    )}
                  </div>
                  {/* Form fields and submit button */}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}
