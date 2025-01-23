import {
  type Chain,
  createPublicClient,
  createWalletClient,
  custom,
  http,
  type PublicClient,
  type WalletClient,
} from "viem";

export const getPublicClient = (chain: Chain): PublicClient => {
  return createPublicClient({
    chain,
    transport: http(),
  });
};

export const getWalletClient = (chain: Chain): WalletClient | undefined => {
  if (typeof window !== "undefined") {
    return createWalletClient({
      chain,
      transport: custom(window.ethereum),
    });
  }
};
