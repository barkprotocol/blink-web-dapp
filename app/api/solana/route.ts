'use server';

import { NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '@/lib/db/drizzle';
import { users } from '@/lib/db/schema';
import {
  mintNFT,
  createBlink,
  donate,
  payments,
  createTransaction,
} from '@/lib/solana/actions'; // Import your Solana actions here

// Define schemas for validation
const mintNFTSchema = z.object({
  userId: z.number(),
  metadata: z.object({
    name: z.string(),
    symbol: z.string(),
    uri: z.string(),
  }),
});

const transactionSchema = z.object({
  recipient: z.string(),
  amount: z.number(),
});

export async function POST(request: Request) {
  const { pathname } = new URL(request.url);

  // Handle minting NFTs
  if (pathname === '/mint-nft') {
    const body = await request.json();
    
    // Validate the request body
    const result = mintNFTSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: result.error.errors }, { status: 400 });
    }

    const { userId, metadata } = result.data;

    // Ensure user exists
    const user = await db.select().from(users).where(eq(users.id, userId)).limit(1);
    if (!user.length) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    try {
      const nft = await mintNFT(metadata, user[0].walletAddress); // Use your NFT minting function
      return NextResponse.json(nft, { status: 201 });
    } catch (error) {
      return NextResponse.json({ error: 'Failed to mint NFT', details: error }, { status: 500 });
    }
  }

  // Handle creating transactions
  if (pathname === '/create-transaction') {
    const body = await request.json();
    
    // Validate transaction data
    const transactionResult = transactionSchema.safeParse(body.transactionData);
    if (!transactionResult.success) {
      return NextResponse.json({ error: transactionResult.error.errors }, { status: 400 });
    }

    const { userId, transactionData } = body;

    const user = await db.select().from(users).where(eq(users.id, userId)).limit(1);
    if (!user.length) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    try {
      const transaction = await createTransaction(transactionData, user[0].walletAddress); // Use your transaction function
      return NextResponse.json(transaction, { status: 201 });
    } catch (error) {
      return NextResponse.json({ error: 'Failed to create transaction', details: error }, { status: 500 });
    }
  }

  // Handle creating Blink actions
  if (pathname === '/create-blink') {
    const body = await request.json();
    const { userId, blinkData } = body;

    // Validate Blink data here (if necessary)
    try {
      const blinkResponse = await createBlink(blinkData, userId); // Function to create a Blink action
      return NextResponse.json(blinkResponse, { status: 201 });
    } catch (error) {
      return NextResponse.json({ error: 'Failed to create Blink action', details: error }, { status: 500 });
    }
  }

  // Handle donations
  if (pathname === '/donate') {
    const body = await request.json();
    const { userId, donationData } = body;

    // Validate donation data here
    try {
      const donationResponse = await donate(donationData, userId); // Function to process a donation
      return NextResponse.json(donationResponse, { status: 201 });
    } catch (error) {
      return NextResponse.json({ error: 'Failed to process donation', details: error }, { status: 500 });
    }
  }

  // Handle payments
  if (pathname === '/payments') {
    const body = await request.json();
    const { userId, paymentData } = body;

    // Validate payment data here
    try {
      const paymentResponse = await payments(paymentData, userId); // Function to process a payment
      return NextResponse.json(paymentResponse, { status: 201 });
    } catch (error) {
      return NextResponse.json({ error: 'Failed to process payment', details: error }, { status: 500 });
    }
  }

  return NextResponse.json({ error: 'Not Found' }, { status: 404 });
}
