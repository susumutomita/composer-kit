import { type Address, encodeFunctionData, parseEther } from "viem";
import {
  useAccount,
  useConfig,
  useSendTransaction,
  useSwitchChain,
} from "wagmi";
import {
  waitForTransactionReceipt,
  type WaitForTransactionReceiptReturnType,
} from "@wagmi/core";
import { useCallback, useState } from "react";
import type { Transaction, LifeCycleStatus } from "../types";

export function useTransactionHandler({
  chainId,
  transaction,
  onSuccess,
  onError,
  updateStatus,
}: {
  chainId: number;
  transaction: Transaction;
  onSuccess: (receipt: WaitForTransactionReceiptReturnType) => void;
  onError: (error: unknown) => void;
  updateStatus: (status: LifeCycleStatus) => void;
}): {
  executeTransaction: () => Promise<void>;
  transactionHash: string;
  transactionReceipt: WaitForTransactionReceiptReturnType | null;
  reset: () => void;
  setTransactionHash: (hash: string) => void;
  setTransactionReceipt: (
    receipt: WaitForTransactionReceiptReturnType | null
  ) => void;
} {
  const { switchChainAsync } = useSwitchChain();
  const { chainId: currentChainId } = useAccount();
  const { sendTransactionAsync, reset } = useSendTransaction();
  const config = useConfig();

  const [transactionHash, setTransactionHash] = useState("");
  const [transactionReceipt, setTransactionReceipt] =
    useState<WaitForTransactionReceiptReturnType | null>(null);

  const executeTransaction = useCallback(async () => {
    updateStatus({
      message: "Preparing the transaction",
      status: "buildingTransaction",
    });

    try {
      if (currentChainId !== chainId) {
        await switchChainAsync({ chainId });
      }

      const hash = await sendTransactionAsync({
        to: transaction.address,
        data: encodeFunctionData({
          abi: transaction.abi,
          functionName: transaction.functionName,
          args: transaction.args,
        }),
      });

      setTransactionHash(hash);
      updateStatus({
        message: "Transaction is pending confirmation",
        status: "pending",
      });

      if (!hash) {
        throw new Error("Transaction hash is not available");
      }

      const receipt = await waitForTransactionReceipt(config, { hash });

      setTransactionReceipt(receipt);
      updateStatus({
        message: "Transaction completed successfully",
        status: "success",
      });

      onSuccess(receipt);
    } catch (error) {
      updateStatus({ message: "Transaction failed", status: "error" });
      onError(error);
    }
  }, [
    chainId,
    currentChainId,
    config,
    sendTransactionAsync,
    switchChainAsync,
    transaction,
    onSuccess,
    onError,
    updateStatus,
  ]);

  return {
    executeTransaction,
    transactionHash,
    transactionReceipt,
    reset,
    setTransactionHash,
    setTransactionReceipt,
  };
}
