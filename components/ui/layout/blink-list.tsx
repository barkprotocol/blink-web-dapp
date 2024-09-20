"use client";

import React, { useEffect, useState } from 'react';
import { getBlinks } from '@/lib/api';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, AlertCircle, Download } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface Blink {
  id: string;
  title: string;
  description: string;
  price: string;
  image: string;
  category: string;
}

export default function BlinkList() {
  const [blinks, setBlinks] = useState<Blink[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlinks = async () => {
      try {
        const data = await getBlinks();
        setBlinks(data);
      } catch (err) {
        setError('Failed to load blinks. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlinks();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="max-w-md mx-auto mt-8">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Available Blinks</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blinks.map((blink) => (
          <Card key={blink.id} className="overflow-hidden transition-shadow hover:shadow-lg bg-white">
            <img 
              src={blink.image || '/path/to/placeholder/image.png'} 
              alt={blink.title || 'Blink image'} 
              className="w-full h-48 object-cover" 
            />
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">{blink.title}</CardTitle>
              <p className="text-sm text-gray-500 capitalize">{blink.category}</p>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4 line-clamp-2">{blink.description}</p>
              <p className="font-bold text-2xl text-gray-800">{blink.price} SOL</p>
            </CardContent>
            <CardFooter className="bg-gray-50">
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={() => window.open(blink.image, '_blank')}
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      {blinks.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No Blinks available at the moment.</p>
      )}
    </div>
  );
}
