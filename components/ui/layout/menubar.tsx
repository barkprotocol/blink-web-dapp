"use client";

import Link from "next/link";

const MenuBar = () => {
  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">
          <Link href="/" className="text-gray-800 hover:text-gray-600">
            BlinkApp
          </Link>
        </div>
        <div className="flex space-x-4">
          <Link href="/create-blink" className="text-gray-800 hover:text-gray-600">
            Create Blink
          </Link>
          <Link href="/existing-blinks" className="text-gray-800 hover:text-gray-600">
            Existing Blinks
          </Link>
          <Link href="/about" className="text-gray-800 hover:text-gray-600">
            About
          </Link>
          {/* Add more links as needed */}
        </div>
      </div>
    </nav>
  );
};

export default MenuBar;
