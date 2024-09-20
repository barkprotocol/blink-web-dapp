import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Step {
  title: string
  description: string
}

interface BlinkCreationProcessProps {
  steps: Step[]
  currentStep: number
  children: React.ReactNode
  onPrevStep: () => void
  onNextStep: () => void
  isLastStep: boolean
  isSubmitting: boolean
  onSubmit: (e: React.FormEvent) => void
}

export function BlinkCreationProcess({
  steps,
  currentStep,
  children,
  onPrevStep,
  onNextStep,
  isLastStep,
  isSubmitting,
  onSubmit
}: BlinkCreationProcessProps) {
  return (
    <Card className="w-full max-w-2xl mx-auto overflow-hidden bg-white shadow-lg">
      <CardHeader className="bg-gradient-to-r from-gray-700 to-gray-900 text-white">
        <CardTitle className="text-3xl font-bold">Create Your Blink</CardTitle>
        <p className="text-gray-300">Bring your digital assets to life</p>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex justify-between mb-8">
          {steps.map((step, index) => (
            <div key={step.title} className="text-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 transition-colors ${
                  index <= currentStep ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-500'
                }`}
              >
                {index < currentStep ? '✓' : index + 1}
              </div>
              <p
                className={`text-sm font-medium ${
                  index <= currentStep ? 'text-gray-800' : 'text-gray-500'
                }`}
              >
                {step.title}
              </p>
            </div>
          ))}
        </div>
        <form onSubmit={onSubmit} className="space-y-6">
          {children}
        </form>
      </CardContent>
      <CardFooter className="flex justify-between bg-gray-50">
        {currentStep > 0 && (
          <Button onClick={onPrevStep} variant="outline" className="flex items-center">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
        )}
        {!isLastStep ? (
          <Button onClick={onNextStep} className="flex items-center ml-auto bg-gray-800 hover:bg-gray-700">
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center ml-auto bg-gray-800 hover:bg-gray-700"
          >
            {isSubmitting ? 'Creating...' : 'Create Blink'}
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}