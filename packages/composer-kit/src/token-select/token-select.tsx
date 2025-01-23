import React, { createContext, useContext, useState } from "react";

export interface Token {
  address: string;
  chainId: number;
  decimals: number;
  name: string;
  symbol: string;
}

interface TokenSelectContextType {
  open: boolean;
  selectedToken: Token | null;
  setOpen: (open: boolean) => void;
  setSelectedToken: (token: Token) => void;
}

const TokenSelectContext = createContext<TokenSelectContextType | undefined>(
  undefined
);

interface TokenSelectProps {
  children: React.ReactNode;
  defaultToken?: Token;
  delayMs?: number;
  onChange?: (token: Token) => void;
}

export function TokenSelect({
  children,
  defaultToken,
}: TokenSelectProps): JSX.Element {
  const [selectedToken, setSelectedToken] = useState<Token | null>(
    defaultToken || null
  );
  const [open, setOpen] = useState(false);

  return (
    <TokenSelectContext.Provider
      value={{ selectedToken, setSelectedToken, open, setOpen }}
    >
      {children}
    </TokenSelectContext.Provider>
  );
}

export function useTokenSelect(): TokenSelectContextType {
  const context = useContext(TokenSelectContext);
  if (!context) {
    throw new Error("Token Select components must be used within TokenSelect");
  }
  return context;
}
