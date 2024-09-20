"use client";

import React from 'react';
import CreateBlink from "@/components/ui/create-blink";

export default function BlinkDashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Blink Dashboard</h1>
        <CreateBlink />
      </div>
    </div>
  );
}
