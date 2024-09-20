import { NextResponse } from 'next/server';
import { z } from 'zod';
import { logError, logInfo } from '@/lib/logging'; // Logging utility
import { verifyJWT } from '@/lib/security'; // Security utility for token validation
import { createSolanaPaymentTransaction } from '@/lib/solana/actions'; // Action to handle Solana Pay transactions
import { APIResponse, TransactionResponse } from '@/lib/types';

// Schema for validating Solana Pay requests
const solanaPaySchema = z.object({
  recipient: z.string().min(32, "Invalid recipient address"),
  amount: z.number().positive("Amount must be a positive number"),
  userId: z.number(),
});

// Helper function to handle the Solana Pay transaction
async function handleSolanaPayTransaction(userId: number, recipient: string, amount: number) {
  try {
    const transactionResponse: TransactionResponse = await createSolanaPaymentTransaction({
      recipient,
      amount,
      userId,
    });

    if (!transactionResponse.success) {
      logError('Solana Pay transaction failed', { userId, error: transactionResponse.error });
      return { error: transactionResponse.error || 'Transaction failed', status: 500 };
    }

    logInfo('Solana Pay transaction successful', { userId, transactionId: transactionResponse.transactionId });
    return { data: transactionResponse, status: 201 };
  } catch (error) {
    logError('Internal error during Solana Pay transaction', { userId, error });
    return { error: 'Internal server error', status: 500 };
  }
}

// POST handler for Solana Pay transactions
export async function POST(request: Request) {
  // JWT Token Validation
  const token = request.headers.get('Authorization')?.replace('Bearer ', '');
  if (!token || !verifyJWT(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const result = solanaPaySchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: result.error.errors }, { status: 400 });
    }

    const { recipient, amount, userId } = result.data;
    const transactionResponse = await handleSolanaPayTransaction(userId, recipient, amount);

    if (transactionResponse.error) {
      return NextResponse.json({ error: transactionResponse.error }, { status: transactionResponse.status });
    }

    return NextResponse.json(transactionResponse.data, { status: transactionResponse.status });
  } catch (error) {
    logError('Unhandled server error during Solana Pay transaction', { error });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
