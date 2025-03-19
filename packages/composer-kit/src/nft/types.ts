import { type Address } from "viem";

export interface NFTMetadata {
  description: string;
  external_url: string;
  image: string;
  name: string;
  attributes?: {
    trait_type: string;
    value: string | number;
  }[];
}

export interface NFTProps {
  children: React.ReactNode;
  contractAddress: Address;
  tokenId: bigint;
}

export interface NFTContextType {
  isLoading: boolean;
  metadata: NFTMetadata | null;
  owner: string | null;
  tokenURI: string | null;
  tokenId: bigint;
}
