import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { type WaitForTransactionReceiptReturnType } from "@wagmi/core";
import { useTransactionHandler } from "./hooks/use-transaction-handler";
import { useTransactionLifecycle } from "./hooks/use-transaction-life-cycle";
import type { Transaction as TransactionType, LifeCycleStatus } from "./types";

interface TransactionContextType {
  onTransaction: () => void;
  lifeCycleStatus: LifeCycleStatus;
  transactionHash: string;
  transactionReceipt: WaitForTransactionReceiptReturnType | null;
  isLoading: boolean;
  chainId: number;
}

interface TransactionProps {
  children: React.ReactNode;
  onSuccess: (transactionReceipt: WaitForTransactionReceiptReturnType) => void;
  onError: (error: unknown) => void;
  chainId: number;
  transaction: TransactionType;
  resetAfter?: number;
}

const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined
);

export function Transaction({
  children,
  chainId,
  onError,
  onSuccess,
  transaction,
  resetAfter = 1000,
}: TransactionProps): JSX.Element {
  const { lifeCycleStatus, updateStatus } = useTransactionLifecycle();
  const {
    executeTransaction,
    transactionHash,
    transactionReceipt,
    reset,
    setTransactionHash,
    setTransactionReceipt,
  } = useTransactionHandler({
    chainId,
    transaction,
    onSuccess,
    onError,
    updateStatus,
  });

  if (!transaction) {
    throw new Error("Transaction prop is required");
  }

  const resetAllStates = useCallback((): void => {
    reset();
    updateStatus({ status: "idle", message: "" });
    setTransactionHash("");
    setTransactionReceipt(null);
  }, [reset, setTransactionHash, setTransactionReceipt, updateStatus]);

  useEffect(() => {
    if (
      (lifeCycleStatus.status === "success" ||
        lifeCycleStatus.status === "error") &&
      resetAfter
    ) {
      const timeout = setTimeout(() => {
        resetAllStates();
        reset();
      }, resetAfter);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [lifeCycleStatus.status, reset, resetAfter, resetAllStates]);

  const ctxValue = useMemo(
    () => ({
      lifeCycleStatus,
      onTransaction: executeTransaction,
      transactionHash,
      transactionReceipt,
      isLoading:
        lifeCycleStatus.status === "pending" ||
        lifeCycleStatus.status === "buildingTransaction",
      chainId,
    }),
    [
      lifeCycleStatus,
      executeTransaction,
      transactionHash,
      transactionReceipt,
      chainId,
    ]
  );

  return (
    <TransactionContext.Provider value={ctxValue}>
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransaction(): TransactionContextType {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error("useTransaction must be used within a TransactionProvider");
  }
  return context;
}
