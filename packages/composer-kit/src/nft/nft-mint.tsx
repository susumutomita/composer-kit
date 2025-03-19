import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { buttonVariants } from "../utils/theme";
import { cn } from "../utils/helper";
import { useMintNFT } from "./hooks/use-nft-mint";
import { useNFTContext } from "./nft";

interface NFTMintProps {
  maxMintable?: number; // Max mintable tokens per transaction
  onSuccess?: (txHash: string) => void;
  onError?: (error: Error) => void;
  resetDelay?: number;
}

export function NFTMint({
  maxMintable = 10,
  onSuccess,
  onError,
  resetDelay,
}: NFTMintProps): JSX.Element {
  const { owner: contractAddress, tokenId, tokenURI } = useNFTContext();
  const { address } = useAccount();
  const {
    mint,
    isPending,
    error,
    isSuccess,
    isLoading,
    receipt,
    reset,
    txHash,
  } = useMintNFT(contractAddress!);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (isSuccess) {
      onSuccess?.(receipt);
    }
    if (error) {
      onError?.(error);
    }
    if (resetDelay) {
      const timeout = setTimeout(() => {
        reset();
      }, resetDelay);
      return () => clearTimeout(timeout);
    }
  }, [error, isSuccess, receipt, reset, onSuccess, onError, resetDelay]);

  const incrementQuantity = () => {
    setQuantity((prev) => Math.min(prev + 1, maxMintable));
  };

  const decrementQuantity = () => {
    setQuantity((prev) => Math.max(prev - 1, 1));
  };

  const handleQuantityChange = (value: string) => {
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue)) {
      setQuantity(Math.min(Math.max(numValue, 1), maxMintable));
    }
  };

  const handleMint = async () => {
    if (!address || !tokenId || !tokenURI) return;
    await mint({
      to: address,
      tokenId,
      tokenURI,
      quantity,
    });
  };

  return (
    <div className="w-full flex gap-3 flex-col">
      <div className="flex items-center gap-2 w-full">
        <button
          className={cn(buttonVariants())}
          disabled={quantity <= 1 || isLoading}
          onClick={decrementQuantity}
          type="button"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M20 12H4"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
        </button>

        <input
          type="number"
          min={1}
          max={maxMintable}
          value={quantity}
          onChange={(e) => handleQuantityChange(e.target.value)}
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base text-center shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
          disabled={isPending}
        />

        <button
          className={cn(buttonVariants())}
          disabled={quantity >= maxMintable || isLoading}
          onClick={incrementQuantity}
          type="button"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 4v16m8-8H4"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
        </button>
      </div>

      <button
        className={cn(buttonVariants(), "mt-2")}
        onClick={handleMint}
        type="button"
        disabled={isLoading || !address || !tokenId || !tokenURI}
      >
        {isLoading ? "Minting..." : "Mint"}
      </button>
    </div>
  );
}
