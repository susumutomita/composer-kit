import { createContext, useContext, useState } from "react";
import { parseUnits, type Address, type Chain } from "viem";
import { switchChain } from "viem/actions";
import { useAccount, useChainId } from "wagmi";
import {
  getPublicClient,
  getWalletClient,
} from "../core/internal/config/web3-config";

export interface PaymentContextType {
  amount: string;
  tokenAddress: Address;
  recipientAddress: Address;
  error: string | null;
  isLoading: boolean;
  handlePayment: () => Promise<void>;
}

export interface PaymentProviderProps {
  amount: string;
  tokenAddress: Address;
  recipientAddress: Address;
  onSuccess?: (txHash: string) => void;
  onError?: (error: Error) => void;
  children: React.ReactNode;
  chain: Chain;
}

export const PaymentContext = createContext<PaymentContextType | undefined>(
  undefined
);

const ERC20_ABI = [
  {
    name: "transfer",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "recipient", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [{ name: "", type: "bool" }],
  },
] as const;

export function Payment({
  amount,
  tokenAddress,
  recipientAddress,
  onSuccess,
  onError,
  children,
  chain,
}: PaymentProviderProps): JSX.Element {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { isConnected } = useAccount();
  const currentChain = useChainId();

  const publicClient = getPublicClient(chain);
  const walletClient = getWalletClient(chain);

  const handlePayment = async (): Promise<void> => {
    try {
      setError(null);
      setIsLoading(true);

      if (!isConnected) {
        throw new Error("Please connect your wallet");
      }

      if (currentChain !== chain.id) {
        await switchChain(publicClient, chain);
      }

      const amountInWei = parseUnits(amount, 18);

      const hash = await walletClient?.writeContract({
        abi: ERC20_ABI,
        account: recipientAddress,
        functionName: "transfer",
        address: tokenAddress,
        args: [recipientAddress, amountInWei],
        chain,
      });

      onSuccess?.(hash!);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Payment failed");
      onError?.(err instanceof Error ? err : new Error("Payment failed"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PaymentContext.Provider
      value={{
        amount,
        tokenAddress,
        recipientAddress,
        error,
        isLoading,
        handlePayment,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
}

export function usePayment(): PaymentContextType {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error("usePayment must be used within a PaymentProvider");
  }
  return context;
}
