"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, ArrowRight, Zap, CreditCard, Database, Shield } from "lucide-react";
import Link from 'next/link';

export default function CreateBlink() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [customizations, setCustomizations] = useState({});
  const [integrations, setIntegrations] = useState([]);

  const steps = [
    { title: "Choose Your Template", description: "Select from our range of pre-built templates tailored for various use cases." },
    { title: "Customize Your Blink", description: "Modify the template to fit your specific needs using our intuitive interface." },
    { title: "Add Integrations", description: "Easily integrate third-party services and APIs to enhance your application." },
    { title: "Deploy and Scale", description: "Launch your Blink and easily scale as your user base grows." }
  ];

  const templates = [
    { id: 1, name: "E-commerce", icon: <CreditCard className="h-6 w-6" /> },
    { id: 2, name: "Donate", icon: <Shield className="h-6 w-6" /> },
    { id: 3, name: "Blog", icon: <Database className="h-6 w-6" /> },
    { id: 4, name: "Portfolio", icon: <Zap className="h-6 w-6" /> },
    { id: 5, name: "Payments", icon: <Shield className="h-6 w-6" /> }
  ];

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setCurrentStep(2);
  };

  const handleCustomization = (key, value) => {
    setCustomizations(prev => ({ ...prev, [key]: value }));
  };

  const handleIntegrationToggle = (integration) => {
    setIntegrations(prev => 
      prev.includes(integration) 
        ? prev.filter(i => i !== integration)
        : [...prev, integration]
    );
  };

  const handleDeploy = () => {
    // Simulating deployment process
    console.log("Deploying Blink with:", { selectedTemplate, customizations, integrations });
    setCurrentStep(4);
  };

  const renderStepContent = () => {
    switch(currentStep) {
      case 1:
        return (
          <div className="grid grid-cols-2 gap-4">
            {templates.map(template => (
              <Card key={template.id} className="cursor-pointer hover:border-primary" onClick={() => handleTemplateSelect(template)}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    {template.icon}
                    <span className="ml-2">{template.name}</span>
                  </CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Customize {selectedTemplate?.name} Template</h3>
            <input
              type="text"
              placeholder="Blink Name"
              className="w-full p-2 border rounded"
              onChange={(e) => handleCustomization('name', e.target.value)}
            />
            <textarea
              placeholder="Description"
              className="w-full p-2 border rounded"
              onChange={(e) => handleCustomization('description', e.target.value)}
            />
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Select Integrations</h3>
            {['Stripe', 'SolanaPay', 'PayPal'].map(integration => (
              <label key={integration} className="flex items-center">
                <input
                  type="checkbox"
                  checked={integrations.includes(integration)}
                  onChange={() => handleIntegrationToggle(integration)}
                  className="mr-2"
                />
                {integration}
              </label>
            ))}
          </div>
        );
      case 4:
        return (
          <div className="text-center">
            <h3 className="text-lg font-medium mb-4">Your Blink is Ready!</h3>
            <p>Congratulations! Your Blink has been successfully deployed.</p>
            <Link href="/dashboard">
              <Button className="mt-4">Go to Dashboard</Button>
            </Link>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Create Your Blink</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {steps.map((step, index) => (
          <Card key={index} className={index + 1 <= currentStep ? "border-primary" : ""}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <span className="mr-2">{index + 1}.</span>
                {step.title}
                {index + 1 < currentStep && (
                  <CheckCircle2 className="ml-2 h-5 w-5 text-green-500" />
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{step.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="mb-8">
        <CardContent className="p-6">
          {renderStepContent()}
        </CardContent>
      </Card>
      <div className="flex justify-between">
        <Button 
          onClick={() => setCurrentStep(prev => Math.max(prev - 1, 1))}
          disabled={currentStep === 1}
        >
          Previous
        </Button>
        <Button 
          onClick={() => currentStep === 3 ? handleDeploy() : setCurrentStep(prev => Math.min(prev + 1, steps.length))}
          disabled={currentStep === 4}
        >
          {currentStep === 3 ? "Deploy" : currentStep === 4 ? "Complete" : "Next"}
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
