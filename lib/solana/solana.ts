import { Connection, PublicKey, Transaction, SystemProgram } from '@solana/web3.js';
import { clusterApiUrl } from '@solana/web3.js';
import { TransactionResponse } from '@/lib/types';

// Set up a connection to the Solana network
const SOLANA_NETWORK = process.env.NEXT_PUBLIC_SOLANA_NETWORK || 'devnet';
const SOLANA_RPC_URL = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || clusterApiUrl(SOLANA_NETWORK);

export const connection = new Connection(SOLANA_RPC_URL, 'confirmed');

// Function to create and send a Solana payment transaction
export async function createSolanaPaymentTransaction({
  recipient,
  amount,
  userId,
}: {
  recipient: string;
  amount: number;
  userId: number;
}): Promise<TransactionResponse> {
  try {
    const recipientPublicKey = new PublicKey(recipient);

    // Get recent blockhash
    const { blockhash } = await connection.getRecentBlockhash();

    // Create a transaction object
    const transaction = new Transaction({
      recentBlockhash: blockhash,
      feePayer: new PublicKey(process.env.DEFAULT_WALLET_ADDRESS!), // Fee payer is your app's default wallet
    });

    // Add an instruction to transfer SOL
    transaction.add(
      SystemProgram.transfer({
        fromPubkey: new PublicKey(process.env.DEFAULT_WALLET_ADDRESS!),
        toPubkey: recipientPublicKey,
        lamports: amount * 1e9, // Convert SOL amount to lamports
      })
    );

    // Send the transaction
    const signature = await connection.sendTransaction(transaction, []);

    // Confirm the transaction
    const confirmation = await connection.confirmTransaction(signature, 'confirmed');

    if (confirmation.value.err) {
      console.error('Transaction failed', confirmation.value.err);
      return { success: false, error: 'Transaction failed' };
    }

    return { success: true, transactionId: signature };
  } catch (error) {
    console.error('Error creating Solana payment transaction:', error);
    return { success: false, error: 'Internal server error' };
  }
}

// Function to check the balance of a Solana wallet
export async function getSolanaWalletBalance(walletAddress: string): Promise<number> {
  try {
    const publicKey = new PublicKey(walletAddress);
    const balance = await connection.getBalance(publicKey);
    return balance / 1e9; // Convert lamports to SOL
  } catch (error) {
    console.error('Error fetching wallet balance:', error);
    return 0;
  }
}
