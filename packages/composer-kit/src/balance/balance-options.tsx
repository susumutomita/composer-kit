import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../core/select";
import { Token, useBalance } from "./balance";

interface BalanceOptionsProps {
  tokens: Token[];
}

export function BalanceOptions({ tokens }: BalanceOptionsProps) {
  const { selectedToken, handleTokenChange } = useBalance();

  const handleSelectChange = (token: string) => {
    handleTokenChange(tokens)(token);
  };

  return (
    <div>
      <Select
        defaultValue={selectedToken?.symbol}
        onValueChange={handleSelectChange}
        value={selectedToken?.symbol}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a token" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {tokens.map((token) => (
              <SelectItem key={token.address} value={token.symbol}>
                <div className="flex gap-2 flex-row items-center">
                  {token?.icon && (
                    <img
                      alt={token.name}
                      className="w-6 h-6 rounded-full mr-2"
                      src={token.icon}
                    />
                  )}
                  <span>{token.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
