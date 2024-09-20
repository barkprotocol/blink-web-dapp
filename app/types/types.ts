// User type representing a user in your application
export interface User {
  id: number;
  walletAddress: string;
  email: string;
  createdAt: Date;
}

// Metadata type for NFTs
export interface NFTMetadata {
  name: string;
  symbol: string;
  uri: string;
}

// Transaction data type for creating transactions
export interface TransactionData {
  recipient: string; // The address of the recipient
  amount: number;    // Amount can be in your desired unit (e.g., tokens, SOL)
}

// Response type for minting NFTs
export interface MintNFTResponse {
  success: boolean;
  nftId?: string;   // The ID of the minted NFT, if applicable
  error?: string;   // Error message if minting fails
}

// Response type for transactions
export interface TransactionResponse {
  success: boolean;
  transactionId?: string; // The ID of the created transaction, if applicable
  error?: string;         // Error message if transaction creation fails
}

// General API response type
export interface APIResponse<T = any> {
  data?: T;              // Optional data field for successful responses
  error?: string;        // Error message for failed responses
}

// Error response type for detailed error handling
export interface ErrorResponse {
  statusCode: number;    // HTTP status code
  message: string;       // Human-readable error message
  details?: string;      // Optional field for additional error details
}
