import { Address, Chain } from "viem";
import { createContext, useCallback, useContext, useState } from "react";

export interface Token {
  name: string;
  symbol: string;
  address: string;
  decimals: number;
  icon?: string;
  chainId: number | Chain;
}

interface BalanceContext {
  selectedToken: Token | null;
  address: Address | undefined;
  handleTokenChange: (tokens: Token[]) => (token: string) => void;
  handleAddressChange: (e: any) => void;
}

interface BalanceProps {
  children: React.ReactNode;
}

const BalanceContext = createContext<BalanceContext | undefined>(undefined);

export function Balance({ children }: BalanceProps): JSX.Element | null {
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [address, setAddress] = useState<Address | undefined>(undefined);

  const handleTokenChange = useCallback((tokens: Token[]) => {
    return (token: string) => {
      const selectedToken = tokens.find((t) => t.symbol === token);
      if (selectedToken) {
        setSelectedToken(selectedToken);
      }
    };
  }, []);

  const handleAddressChange = useCallback((e: any) => {
    setAddress(e.target.value);
  }, []);

  return (
    <BalanceContext.Provider
      value={{ address, selectedToken, handleAddressChange, handleTokenChange }}
    >
      {children}
    </BalanceContext.Provider>
  );
}

export const useBalance = (): BalanceContext => {
  const context = useContext(BalanceContext);
  if (!context) {
    throw new Error("useBalance must be used within a BalanceProvider");
  }
  return context;
};
