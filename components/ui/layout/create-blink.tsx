"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js'
import { Upload, Download } from 'lucide-react'
import { BlinkCreationProcess } from "@/components/ui/layout/blink-creation-process"
import { Switch } from "@/components/ui/switch"

interface FormData {
  title: string
  description: string
  category: string
  price: string
  tags: string
  image: File | null
  isNFT: boolean
}

interface Blink {
  id: string
  title: string
  description: string
  price: string
  image: string
  category: string
}

const BLINK_CREATION_STEPS = [
  { title: 'Basic Info', description: 'Enter your Blink details' },
  { title: 'Media', description: 'Add a cover image for your Blink' },
  { title: 'Pricing', description: 'Set the price in SOL' },
  { title: 'Review', description: 'Confirm and create your Blink' },
]

export default function CreateBlink() {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    category: '',
    price: '',
    tags: '',
    image: null,
    isNFT: false,
  })
  const [blinks, setBlinks] = useState<Blink[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { connection } = useConnection()
  const { publicKey, sendTransaction } = useWallet()

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
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey("YOUR_RECIPIENT_ADDRESS_HERE"),
          lamports: LAMPORTS_PER_SOL * 0.1, // 0.1 SOL fee
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

    const newBlink: Blink = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      price: formData.price,
      image: formData.image ? URL.createObjectURL(formData.image) : '/placeholder.svg?height=200&width=300',
      category: formData.category,
    }

    setBlinks((prev) => [...prev, newBlink])
    toast({
      title: "Blink Created",
      description: `Your new Blink has been successfully created and listed${formData.isNFT ? ' as an NFT' : ''}.`,
    })
    setFormData({ title: '', description: '', category: '', price: '', tags: '', image: null, isNFT: false })
    setCurrentStep(0)
    setIsSubmitting(false)
  }

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, BLINK_CREATION_STEPS.length - 1))
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0))

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => handleChange(e, 'title')}
                placeholder="Enter a catchy title for your Blink"
                required
                className="border-gray-300 focus:border-gray-500 focus:ring-gray-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange(e, 'description')}
                placeholder="Describe your Blink in detail"
                required
                className="border-gray-300 focus:border-gray-500 focus:ring-gray-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category} onValueChange={(value) => handleChange(value, 'category')}>
                <SelectTrigger className="border-gray-300 focus:border-gray-500 focus:ring-gray-500">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="digital">Digital Product</SelectItem>
                  <SelectItem value="physical">Physical Product</SelectItem>
                  <SelectItem value="service">Service</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )
      case 1:
        return (
          <div className="space-y-4">
            <Label htmlFor="image">Cover Image</Label>
            <Card className="p-4 border-2 border-dashed border-gray-300 hover:border-gray-500 transition-colors">
              {formData.image ? (
                <img
                  src={URL.createObjectURL(formData.image)}
                  alt="Blink cover"
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
              ) : (
                <div className="w-full h-48 bg-gray-100 flex items-center justify-center rounded-md mb-4">
                  <Upload className="w-12 h-12 text-gray-400" />
                </div>
              )}
              <Input
                type="file"
                id="image"
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
              <Label htmlFor="image" className="cursor-pointer">
                <Button variant="outline" className="w-full">
                  {formData.image ? 'Change Image' : 'Upload Image'}
                </Button>
              </Label>
            </Card>
          </div>
        )
      case 2:
        return (
          <>
            <div className="space-y-4">
              <Label htmlFor="price">Price (SOL)</Label>
              <Input
                type="number"
                id="price"
                value={formData.price}
                onChange={(e) => handleChange(e, 'price')}
                placeholder="Enter price in SOL"
                min="0"
                step="0.01"
                required
                className="border-gray-300 focus:border-gray-500 focus:ring-gray-500"
              />
              <p className="text-sm text-gray-500">Set a competitive price for your Blink</p>
            </div>
            <div className="flex items-center space-x-2 mt-4">
              <Switch
                id="isNFT"
                checked={formData.isNFT}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isNFT: checked }))}
              />
              <Label htmlFor="isNFT">List as NFT</Label>
            </div>
          </>
        )
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800">Review Your Blink</h3>
            <Card className="p-4 bg-gray-50">
              <p><strong>Title:</strong> {formData.title}</p>
              <p><strong>Description:</strong> {formData.description}</p>
              <p><strong>Category:</strong> {formData.category}</p>
              <p><strong>Price:</strong> {formData.price} SOL</p>
              <p><strong>Listed as NFT:</strong> {formData.isNFT ? 'Yes' : 'No'}</p>
              {formData.image && (
                <img
                  src={URL.createObjectURL(formData.image)}
                  alt="Blink preview"
                  className="w-full h-48 object-cover rounded-md mt-4"
                />
              )}
            </Card>
            <div className="flex justify-center">
              <WalletMultiButton />
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <BlinkCreationProcess
          steps={BLINK_CREATION_STEPS}
          currentStep={currentStep}
          onPrevStep={prevStep}
          onNextStep={nextStep}
          isLastStep={currentStep === BLINK_CREATION_STEPS.length - 1}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
        >
          {renderStepContent()}
        </BlinkCreationProcess>

        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 mt-12">Your Blinks</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blinks.map((blink) => (
            <Card key={blink.id} className="overflow-hidden transition-shadow hover:shadow-lg bg-white">
              <img src={blink.image} alt={blink.title} className="w-full h-48 object-cover" />
              <CardContent className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{blink.title}</h3>
                <p className="text-sm text-gray-500 capitalize mb-2">{blink.category}</p>
                <p className="text-gray-600 mb-4 line-clamp-2">{blink.description}</p>
                <p className="font-bold text-2xl text-gray-800 mb-4">{blink.price} SOL</p>
                <Button variant="outline" className="w-full" onClick={() => window.open(blink.image, '_blank')}>
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}