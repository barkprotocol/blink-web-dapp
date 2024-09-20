import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Manrope, Oswald, Poppins } from 'next/font/google';
import { UserProvider } from '@/lib/auth';
import { getUser } from '@/lib/db/queries';

export const metadata: Metadata = {
  title: 'BARK Blinks',
  description: 'BARK Blink is a powerful component of Blink BaaS (Blink As A Service) that streamlines interactions with blockchain assets, particularly within the Solana ecosystem',
};

export const viewport: Viewport = {
  maximumScale: 1,
};

const manrope = Manrope({ subsets: ['latin'] });
const oswald = Oswald({ subsets: ['latin'], weight: ['400', '600', '700'] });
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600', '700'] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userPromise = getUser();

  return (
    <html
      lang="en"
      className={`bg-white dark:bg-gray-950 text-black dark:text-white ${manrope.className}`}
    >
      <body className={`min-h-[100dvh] bg-gray-50 ${poppins.className}`}>
        <UserProvider userPromise={userPromise}>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
