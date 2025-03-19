// @ts-nocheck
import { useState } from "react";
import {
  useWriteContract,
  useWaitForTransactionReceipt,
  useAccount,
} from "wagmi";
import { parseAbi, getAddress, type Address } from "viem";

// Interface for the parameters needed for minting
interface MintParams {
  // The recipient address that will receive the NFT
  to: string;
  // Optional token ID (for contracts where you can specify the ID)
  tokenId?: bigint;
  // Optional token URI (for contracts that set URI during mint)
  tokenURI?: string;
  // Optional metadata for the NFT
  metadata?: Record<string, any>;
  // Optional quantity for minting multiple NFTs
  quantity?: number;
}

// Interface for the hook return values
interface MintNFTResult {
  // Function to call to mint the NFT
  mint: (params: MintParams) => Promise<void>;
  // Transaction hash if available
  txHash: `0x${string}` | null;
  // True when a transaction is pending
  isPending: boolean;
  // Error object if something went wrong
  error: Error | null;
  // Transaction data once confirmed
  receipt: any;
  // True if transaction was successful
  isSuccess: boolean;
  // Reset function to clear state
  reset: () => void;
  // True when the contract is writing
  isLoading: boolean;
}

// Common ERC721 and ERC721Mintable ABIs
const erc721MintableAbi = parseAbi([
  // Standard ERC721 mint (most common pattern)
  "function mint(address to) public returns (uint256)",
  // Mint with token ID
  "function mint(address to, uint256 tokenId) public",
  // Mint with token URI
  "function mintWithTokenURI(address to, uint256 tokenId, string memory tokenURI) public",
  // Some contracts use safeMint pattern
  "function safeMint(address to) public returns (uint256)",
  "function safeMint(address to, uint256 tokenId) public",
  "function safeMint(address to, string memory tokenURI) public returns (uint256)",
  // Alternative mint function names
  "function createItem(address to) public returns (uint256)",
  "function createCollectible(string memory tokenURI) public returns (uint256)",
  // Batch minting functions
  "function mintBatch(address to, uint256 quantity) public",
  "function mintMultiple(address to, uint256 quantity) public",
  "function mintMany(address to, uint256 quantity) public",
  "function batchMint(address to, uint256 quantity) public",
]);

/**
 * Hook for minting NFTs on the Celo chain
 *
 * @param contractAddress - The NFT contract address
 * @returns Object with mint function and transaction status
 */
export function useMintNFT(contractAddress: string): MintNFTResult {
  const [txHash, setTxHash] = useState<`0x${string}` | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isContractWriting, setIsContractWriting] = useState(false);
  const { address } = useAccount();

  // Normalize the contract address
  let safeContractAddress: Address;
  try {
    safeContractAddress = getAddress(contractAddress);
  } catch (e) {
    safeContractAddress = "0x0000000000000000000000000000000000000000";
    console.error("Invalid contract address:", e);
  }

  // Setup the contract write hook
  const {
    writeContractAsync,
    reset: resetWrite,
    error: writeError,
    isPending: isWritePending,
  } = useWriteContract();

  // Setup the transaction receipt hook
  const {
    data: receipt,
    isLoading: isReceiptLoading,
    isSuccess,
    error: receiptError,
  } = useWaitForTransactionReceipt({
    hash: txHash || "0x",
    chainId: 42220,
  });

  // Reset all state
  const reset = (): void => {
    setTxHash(null);
    setError(null);
    resetWrite();
  };

  // Function to mint an NFT
  const mint = async (params: MintParams): Promise<void> => {
    if (!address) {
      setError(new Error("Wallet not connected"));
      return;
    }

    try {
      setError(null);

      // Check if we're doing batch minting
      if (params.quantity && params.quantity > 1) {
        await mintBatch(params);
        return;
      }

      // Regular single NFT minting
      // Prepare the appropriate function and args
      let functionName: string;
      let args: any[] = [];

      if (params.tokenId && params.tokenURI) {
        functionName = "mintWithTokenURI";
        args = [params.to || address, params.tokenId, params.tokenURI];
      } else if (params.tokenId) {
        functionName = "mint";
        args = [params.to || address, params.tokenId];
      } else if (params.tokenURI) {
        functionName = "safeMint";
        args = [params.to || address, params.tokenURI];
      } else {
        functionName = "mint";
        args = [params.to || address];
      }

      // If metadata is provided and there's no tokenURI, we need to upload to IPFS or similar
      if (params.metadata && !params.tokenURI) {
        try {
          // For demonstration purposes - in a real implementation, you'd upload to IPFS
          console.log("Metadata would be uploaded to IPFS:", params.metadata);
          // This is where you'd call an IPFS service to pin the metadata
          // And then use the resulting IPFS hash as the tokenURI
        } catch (err) {
          setError(new Error(`Failed to upload metadata: ${err}`));
          return;
        }
      }

      // Try to find the right mint function by attempting different variations
      // This approach handles different contract implementations
      const possibleFunctions = [
        functionName,
        "safeMint",
        "mint",
        "createItem",
        "createCollectible",
      ];

      // Attempt to determine the correct function signature
      // In a real app, you would inspect the contract ABI first
      let hash;

      setIsContractWriting(true);
      try {
        hash = await writeContractAsync({
          address: safeContractAddress,
          abi: erc721MintableAbi,
          functionName: functionName as
            | "mint"
            | "mintWithTokenURI"
            | "safeMint"
            | "createItem"
            | "createCollectible",
          args,
        });
      } catch (err) {
        // If the first attempt fails, try alternative function names
        console.warn(`First mint attempt failed, trying alternatives`);

        // Some contracts only accept specific arguments, try simpler versions
        if (args.length > 1) {
          try {
            hash = await writeContractAsync({
              address: safeContractAddress,
              abi: erc721MintableAbi,
              functionName: "mint",
              args: [params.to || address],
            });
          } catch (secondErr) {
            // Continue to next approach
            console.warn(`Simple mint failed too, trying safeMint`);
          }
        }

        if (!hash) {
          try {
            hash = await writeContractAsync({
              address: safeContractAddress,
              abi: erc721MintableAbi,
              functionName: "safeMint",
              args: [params.to || address],
            });
          } catch (thirdErr) {
            throw new Error(`All mint attempts failed: ${err}`);
          }
        }
      }

      if (hash) {
        setTxHash(hash);
      } else {
        setError(new Error("Mint transaction failed"));
      }
    } catch (err) {
      console.error("Error minting NFT:", err);
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setIsContractWriting(false);
    }
  };

  // Combine errors from different sources
  const combinedError = error || writeError || receiptError;

  return {
    mint,
    txHash,
    isPending: isWritePending || isReceiptLoading,
    error: combinedError as Error | null,
    receipt,
    isSuccess,
    reset,
    isLoading: isContractWriting,
  };
}
