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
                Build Your Blink
                <span className="block text-[#CBB5A7]">Faster Than Ever</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                Launch your Blink As A Service product in record time with our powerful,
                ready-to-use template. Packed with modern technologies and
                essential integrations.
              </p>
              <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                <a
                  href="https://vercel.com/templates/next.js/next-js-baas-starter"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="bg-white hover:bg-gray-100 text-black border border-gray-200 rounded-md text-lg px-8 py-4 inline-flex items-center justify-center transition duration-200 ease-in-out transform hover:scale-105">
                    Deploy your own
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>
              </div>
            </div>
            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <div className="rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="https://ucarecdn.com/750e9f1b-edfc-4ac8-a5b4-3286c7de98d6/barkmascottrasparentbg.png?height=400&width=650"
                  alt="Hero Dashboard"
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
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
            Key Features
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <FeatureCard
              icon={<Zap className="h-6 w-6" />}
              title="Easy Integration"
              description="Seamlessly connect your services with our intuitive API and SDK."
            />
            <FeatureCard
              icon={<CreditCard className="h-6 w-6" />}
              title="Flexible Payment Options"
              description="Choose from multiple payment gateways to suit your business needs."
            />
            <FeatureCard
              icon={<Database className="h-6 w-6" />}
              title="Robust Data Management"
              description="Manage your data effectively with our comprehensive tools and services."
            />
            <FeatureCard
              icon={<Shield className="h-6 w-6" />}
              title="Advanced Security"
              description="Protect your applications with our built-in security features and best practices."
            />
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">
            How it Works
          </h2>
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
    </main>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 transition duration-200 ease-in-out hover:shadow-xl">
      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#CBB5A7] text-white mb-4">
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
        <span className="text-lg font-semibold">{step}</span>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-base text-gray-500">{description}</p>
    </div>
  );
}