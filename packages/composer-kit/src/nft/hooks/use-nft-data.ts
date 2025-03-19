import { useState, useEffect } from "react";
import { useReadContract } from "wagmi";
import { erc721Abi } from "viem";
import type { NFTMetadata } from "../types";

interface NFTData {
  tokenId: bigint;
  owner: string;
  tokenURI: string;
  metadata: NFTMetadata | null;
  loading: boolean;
  error: Error | null;
}

/**
 * A custom hook to fetch NFT data from a contract on the Celo chain
 *
 * @param contractAddress - The address of the NFT contract
 * @param tokenId - The ID of the token to fetch data for
 * @returns NFT data including ownership and metadata
 */
export function useNFTData(
  contractAddress: `0x${string}`,
  tokenId: bigint
): NFTData {
  const [metadata, setMetadata] = useState<NFTMetadata | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // Get owner of the token
  const {
    data: owner,
    isError: isOwnerError,
    isLoading: isOwnerLoading,
    error: ownerError,
  } = useReadContract({
    address: contractAddress,
    abi: erc721Abi,
    functionName: "ownerOf",
    args: [tokenId],
    chainId: 42220, // Celo Mainnet chain ID
  });

  // Get token URI
  const {
    data: tokenURI,
    isError: isTokenURIError,
    isLoading: isTokenURILoading,
    error: tokenURIError,
  } = useReadContract({
    address: contractAddress,
    abi: erc721Abi,
    functionName: "tokenURI",
    args: [tokenId],
    chainId: 42220, // Celo Mainnet chain ID
  });

  // Fetch metadata from tokenURI
  useEffect(() => {
    const fetchMetadata = async (): Promise<void> => {
      if (!tokenURI || isTokenURILoading || isTokenURIError) return;

      try {
        setLoading(true);

        // Handle IPFS URIs
        let url = tokenURI;
        if (url.startsWith("ipfs://")) {
          url = url.replace("ipfs://", "https://ipfs.io/ipfs/");
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch metadata: ${response.statusText}`);
        }

        const data = await response.json();
        setMetadata(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
        setMetadata(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMetadata();
  }, [tokenURI, isTokenURILoading, isTokenURIError]);

  // Determine if there's an error from any source
  useEffect(() => {
    if (isOwnerError && ownerError) {
      setError(
        ownerError instanceof Error ? ownerError : new Error(String(ownerError))
      );
    } else if (isTokenURIError && tokenURIError) {
      setError(
        tokenURIError instanceof Error
          ? tokenURIError
          : new Error(String(tokenURIError))
      );
    }
  }, [isOwnerError, ownerError, isTokenURIError, tokenURIError]);

  // Set overall loading state
  useEffect(() => {
    setLoading(
      isOwnerLoading || isTokenURILoading || (!!tokenURI && !metadata && !error)
    );
  }, [isOwnerLoading, isTokenURILoading, tokenURI, metadata, error]);

  return {
    tokenId,
    owner: owner as string,
    tokenURI: tokenURI as string,
    metadata,
    loading,
    error,
  };
}
