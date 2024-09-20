import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Us */}
        <div>
          <h3 className="text-lg font-semibold">About Us</h3>
          <p className="mt-2 text-sm">
            We are a blockchain-focused project creating a seamless NFT minting and staking platform.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <ul className="mt-2 space-y-2">
            <li>
              <Link href="/collection">
                <a className="hover:underline">Collection</a>
              </Link>
            </li>
            <li>
              <Link href="/mint">
                <a className="hover:underline">Blink</a>
              </Link>
            </li>
            <li>
              <Link href="/terms">
                <a className="hover:underline">Terms of Use</a>
              </Link>
            </li>
          </ul>
        </div>

        {/* Connect With Us */}
        <div>
          <h3 className="text-lg font-semibold">Connect With Us</h3>
          <ul className="mt-2 space-y-2">
            <li>
              <a href="https://twitter.com/bark_protocol" className="hover:underline">Twitter</a>
            </li>
            <li>
              <a href="https://discord.com/" className="hover:underline">Discord</a>
            </li>
            <li>
              <a href="mailto:info@example.com" className="hover:underline">Email Us</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Notice */}
      <div className="mt-8 text-center text-sm">
        © {currentYear} BARK Protocol. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
