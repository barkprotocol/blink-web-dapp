"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, CreditCard, Database, Zap, Shield } from 'lucide-react';
import Image from 'next/image';

export default function HomePage() {
  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <h1 className="text-4xl font-bold text-gray-900 tracking-tight sm:text-5xl md:text-6xl">
                Build Your BLINK
                <span className="block text-[#CBB5A7]">Faster Than Ever</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                Experience seamless development and launch your Blink As A Service product with ease. 
                Our powerful platform is packed with modern technologies and essential integrations, 
                making it simpler than ever to innovate.
              </p>
              <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                <a href="./pages/blink" target="_blank" rel="noopener noreferrer">
                  <Button className="bg-gray-800 hover:bg-gray-950 text-white border border-gray-100 rounded-md text-md px-8 py-5 inline-flex items-center justify-center transition duration-100 ease-in-out transform hover:scale-100">
                    Go Blinkboard!
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>
              </div>
            </div>
            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <div className="rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="https://ucarecdn.com/750e9f1b-edfc-4ac8-a5b4-3286c7de98d6/barkmascottrasparentbg.png?height=400&width=650"
                  alt="BARK Mascot"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <FeatureCard
              icon={<Zap className="h-6 w-6 text-[#CBB5A7]" />}
              title="Easy Integration"
              description="Seamlessly connect your services with our intuitive API and SDK."
            />
            <FeatureCard
              icon={<CreditCard className="h-6 w-6 text-[#CBB5A7]" />}
              title="Flexible Payment Options"
              description="Choose from multiple payment gateways to suit your business needs."
            />
            <FeatureCard
              icon={<Database className="h-6 w-6 text-[#CBB5A7]" />}
              title="Robust Data Management"
              description="Manage your data effectively with our comprehensive tools and services."
            />
            <FeatureCard
              icon={<Shield className="h-6 w-6 text-[#CBB5A7]" />}
              title="Advanced Security"
              description="Protect your applications with our built-in security features and best practices."
            />
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">How it Works</h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <HowItWorksCard
              step={1}
              title="Choose Your Template"
              description="Select from our range of pre-built templates tailored for various use cases."
            />
            <HowItWorksCard
              step={2}
              title="Customize Your Blink"
              description="Modify the template to fit your specific needs using our intuitive interface."
            />
            <HowItWorksCard
              step={3}
              title="Add Integrations"
              description="Easily integrate third-party services and APIs to enhance your application."
            />
            <HowItWorksCard
              step={4}
              title="Deploy and Scale"
              description="Launch your Blink and easily scale as your user base grows."
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">Frequently Asked Questions</h2>
          <FAQAccordion />
        </div>
      </section>

      {/* Subscription Section */}
      <SubscriptionSection />

      {/* Footer Section */}
      <footer className="py-12 bg-gray-50 text-dark-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between">
            <p className="text-base">&copy; 2024 BARK Protocol. All rights reserved.</p>
            <nav>
              <a href="#" className="text-gray-400 hover:text-gray-600 mx-2">Terms of Use</a>
              <a href="#" className="text-gray-400 hover:text-gray-600 mx-2">Privacy Policy</a>
            </nav>
          </div>
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-transparent shadow-lg rounded-lg p-6 transition duration-200 ease-in-out hover:shadow-xl border border-transparent hover:bg-gray-100">
      <div className="flex items-center justify-center h-12 w-12 rounded-md mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-base text-gray-500">{description}</p>
    </div>
  );
}

function HowItWorksCard({ step, title, description }) {
  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm transition duration-200 ease-in-out hover:shadow-lg">
      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#CBB5A7] text-white mb-4">
        {step}
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-base text-gray-500">{description}</p>
    </div>
  );
}

function FAQAccordion() {
  const [activeIndex, setActiveIndex] = useState(null);
  
  const faqs = [
    { question: "What is Blink As A Service?", answer: "Blink As A Service (BaaS) provides a streamlined platform for rapidly deploying custom solutions with Web3 payments, Solana actions, NFT minting, and staking capabilities." },
    { question: "How can I customize my Blink?", answer: "Easily modify your Blink using our pre-built templates and integrations, allowing you to tailor the experience to your specific requirements." },
    { question: "Which payment gateways do you support?", answer: "We offer multiple payment gateways, including Stripe, SolanaPay, and PayPal, ensuring flexibility for your transactions." },
    { question: "Is there a trial period available?", answer: "Yes, we offer a 14-day free trial to help you explore our platform and its capabilities before committing." },
    { question: "How do I get started?", answer: "Simply sign up for an account, choose a template, and start customizing your Blink right away!" },
  ];

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div key={index}>
          <button 
            aria-expanded={activeIndex === index} 
            onClick={() => setActiveIndex(activeIndex === index ? null : index)} 
            className="flex items-center justify-between w-full text-left p-4 bg-white border rounded-md focus:outline-none transition duration-200 ease-in-out hover:bg-gray-50"
          >
            <span className="font-medium text-gray-800">{faq.question}</span>
            <span className="ml-2">{activeIndex === index ? '-' : '+'}</span>
          </button>
          {activeIndex === index && (
            <div className="mt-2 p-4 border border-gray-200 rounded-md bg-gray-50">
              <p className="text-gray-700">{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function SubscriptionSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Stay Updated</h2>
        <p className="mb-8 text-lg text-gray-500">Subscribe to our newsletter to receive the latest news and updates.</p>
        <div className="flex flex-col sm:flex-row justify-center items-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="border border-gray-300 rounded-md p-2 mr-2 mb-4 sm:mb-0 sm:mr-4 w-full sm:w-64"
          />
          <Button className="bg-gray-800 hover:bg-gray-950 text-white px-6 py-5 rounded-md">Subscribe</Button>
        </div>
      </div>
    </section>
  );
}
