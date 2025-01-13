import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { type Address, type Chain } from "viem";
import { useAccount, type UseReadContractReturnType } from "wagmi";
import { cn } from "../utils/helper";
import { useBalance } from "./hooks/use-balance";

interface SwapProps {
  children: React.ReactNode;
  className?: string;
}

export interface SwapableTokens {
  name: string;
  symbol: string;
  address: string;
  decimals: number;
  icon?: string;
  chainId: number | Chain;
}

interface SwapContext {
  from: SwapableTokens | undefined;
  to: SwapableTokens | undefined;
  fromAmount: string;
  toAmount: string;
  handleSelectChange: (
    type: "from" | "to",
    swapableTokens: SwapableTokens[]
  ) => (token: string) => void;
  handleAmountChange: (type: "from" | "to") => (amount: string) => void;
  handleToggle: () => void;
  balanceResponse: {
    balance: string;
    error: string;
    response: UseReadContractReturnType;
  };
}

const SwapContext = createContext<SwapContext | undefined>(undefined);

export function Swap({ children, className }: SwapProps): JSX.Element {
  const [from, setFrom] = useState<SwapableTokens>();
  const [to, setTo] = useState<SwapableTokens>();
  const [fromAmount, setFromAmount] = useState<string>("");
  const [toAmount, setToAmount] = useState<string>("");

  const { address } = useAccount();

  const balanceResponse = useBalance({
    address: address as Address,
    tokenMetaData: {
      address: from?.address as Address,
      decimals: from?.decimals as number,
    },
  });

  const handleSelectChange = useCallback(
    (type: "from" | "to", swapableTokens: SwapableTokens[]) => {
      return (token: string) => {
        const selectedToken = swapableTokens.find((t) => t.symbol === token);
        if (type === "from") {
          setFrom(selectedToken);
        } else {
          setTo(selectedToken);
        }
      };
    },
    [setFrom, setTo]
  );

  const handleAmountChange = useCallback(
    (type: "from" | "to") => {
      return (amount: string) => {
        const regex = /^[0-9]*\.?[0-9]*$/;
        if (type === "from") {
          setFromAmount(regex.test(amount) ? amount : fromAmount);
        } else {
          setToAmount(regex.test(amount) ? amount : toAmount);
        }
      };
    },
    [setFromAmount, setToAmount]
  );

  const handleToggle = useCallback(() => {
    const temp = from;
    setFrom(to);
    setTo(temp);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  }, [from, to, fromAmount, toAmount]);

  const contextValue = useMemo(() => {
    return {
      from,
      to,
      fromAmount,
      toAmount,
      handleSelectChange,
      handleAmountChange,
      balanceResponse,
      handleToggle,
    };
  }, [
    from,
    to,
    fromAmount,
    toAmount,
    handleSelectChange,
    handleAmountChange,
    balanceResponse,
    handleToggle,
  ]);

  return (
    <SwapContext.Provider value={contextValue}>
      <div className={cn("bg-background rounded-xl p-6 shadow-md", className)}>
        {children}
      </div>
    </SwapContext.Provider>
  );
}

export const useSwap = (): SwapContext => {
  const context = useContext(SwapContext);
  if (context === undefined) {
    throw new Error("useSwap must be used within a SwapProvider");
  }
  return context;
};
