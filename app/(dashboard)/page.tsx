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
                Launch your Blink As A Service product in record time with our powerful,
                ready-to-use template. Packed with modern technologies and
                essential integrations.
              </p>
              <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                <a href="https://your-link.com" target="_blank" rel="noopener noreferrer">
                  <Button className="bg-gray-800 hover:bg-gray-950 text-white border border-gray-100 rounded-md text-md px-8 py-5 inline-flex items-center justify-center transition duration-100 ease-in-out transform hover:scale-100">
                    Create your Blink
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
      <footer className="py-12 bg-white text-dark-400">
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
    { question: "What is Blink As A Service?", answer: "Blink As A Service (BaaS) is a platform that allows you to quickly deploy custom solutions with Web3 payments, Solana Actions, NFT minting, staking, and modern integrations." },
    { question: "How do I customize my Blink?", answer: "You can modify your Blink by using our pre-built templates and integrations, tailoring them to your specific needs." },
    { question: "What payment gateways are supported?", answer: "We support multiple payment gateways including Stripe, SolanaPay, PayPal, and more." },
    { question: "Is support available?", answer: "Yes, our support team is available 24/7 to help you with any queries or issues." },
  ];

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div key={index}>
          <button 
            aria-expanded={activeIndex === index} 
            onClick={() => setActiveIndex(activeIndex === index ? null : index)} 
            className="flex justify-between items-center w-full p-4 text-left bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 transition">
            <span className="font-medium text-gray-900">{faq.question}</span>
            <span className="ml-2">{activeIndex === index ? '-' : '+'}</span>
          </button>
          {activeIndex === index && (
            <div className="p-4 bg-gray-100 rounded-lg mt-2">
              <p className="text-gray-700">{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function SubscriptionSection() {
  const [email, setEmail] = useState('');

  const handleSubscription = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Subscribed:", email);
    setEmail('');
  };

  return (
    <section className="bg-gray-900 text-white py-12 flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-extrabold mb-4">Stay Updated</h2>
        <p className="text-lg mb-8">Subscribe to our newsletter for the latest news and exclusive offers.</p>
        <form onSubmit={handleSubscription} className="flex justify-center items-center">
          <input 
            type="email" 
            placeholder="Enter your email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 rounded-md bg-gray-800 text-white placeholder-gray-400 border border-transparent focus:border-[#CBB5A7] focus:ring-2 focus:ring-[#CBB5A7] transition duration-200 ease-in-out flex-grow"
            required
          />
          <Button type="submit" className="bg-[#CBB5A7] text-gray-900 rounded-md px-6 ml-4 transition duration-200 ease-in-out hover:bg-[#CBB5A7]/80">
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
}