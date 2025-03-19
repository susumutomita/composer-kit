import React, { createContext, useContext } from "react";
import { useNFTData } from "./hooks/use-nft-data";
import type { NFTContextType, NFTProps } from "./types";

// Context
const NFTContext = createContext<NFTContextType | undefined>(undefined);

export function NFT({
  children,
  contractAddress,
  tokenId,
}: NFTProps): JSX.Element {
  const { error, loading, metadata, tokenURI } = useNFTData(
    contractAddress,
    tokenId
  );

  return (
    <NFTContext.Provider
      value={{
        isLoading: loading,
        metadata,
        owner: contractAddress,
        tokenURI,
        tokenId,
      }}
    >
      <div className="w-full">
        {error ? (
          <div className="mb-4 text-red-500">
            Error loading NFT: {error.message}
          </div>
        ) : null}
        {children}
      </div>
    </NFTContext.Provider>
  );
}

export function useNFTContext(): NFTContextType {
  const context = useContext(NFTContext);
  if (context === undefined) {
    throw new Error("useNFTContext must be used within a NFTContextProvider");
  }
  return context;
}
