import { useEffect, useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../core/select";
import { cn } from "../utils/helper";
import { buttonVariants } from "../utils/theme";
import { useSwap, type SwapableTokens } from "./swap";

interface SwapTokenProps {
  swapableTokens: SwapableTokens[];
  label: string;
  type: "from" | "to";
}

export function SwapToken({
  swapableTokens = [],
  label,
  type,
}: SwapTokenProps): JSX.Element {
  if (swapableTokens.length === 0) {
    throw new Error("No swapable tokens provided to SwapToken component");
  }

  const {
    balanceResponse,
    from,
    to,
    fromAmount,
    toAmount,
    handleAmountChange,
    handleSelectChange,
  } = useSwap();

  const ctx = useMemo(() => {
    return {
      selectedSwapableToken: type === "from" ? from : to,
      setSelectedSwapableToken: handleSelectChange(type, swapableTokens),
      inputValue: type === "from" ? fromAmount : toAmount,
      setInputValue: handleAmountChange(type),
      balanceResponse,
    };
  }, [
    type,
    from,
    to,
    fromAmount,
    toAmount,
    handleSelectChange,
    swapableTokens,
    handleAmountChange,
    balanceResponse,
  ]);

  useEffect(() => {
    if (!ctx.selectedSwapableToken) {
      const swapableToken =
        type === "from" ? swapableTokens[0] : swapableTokens[1];
      ctx.setSelectedSwapableToken(swapableToken.symbol);
    }
  }, []);

  return (
    <div className="bg-background flex justify-between shadow-md border p-4 rounded-xl">
      <div className="flex flex-col gap-2 w-full">
        <div className="flex justify-between">
          <h3 className="font-semibold text-sm">{label}</h3>
          <div className="flex items-center">
            {type === "from" && ctx.balanceResponse.balance ? (
              <button
                className={cn(
                  buttonVariants({ variant: "link", size: "sm", class: "p-0" })
                )}
                onClick={() => {
                  ctx.setInputValue(ctx.balanceResponse.balance);
                }}
                type="button"
              >
                {`Use Max (${ctx.balanceResponse.balance})`}
              </button>
            ) : null}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <Select
            defaultValue={ctx.selectedSwapableToken?.symbol}
            onValueChange={(value) => {
              if (value) {
                ctx.setSelectedSwapableToken(value);
              }
            }}
            value={ctx.selectedSwapableToken?.symbol}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a token" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {swapableTokens
                  .filter((token) =>
                    type === "from"
                      ? token.symbol !== to?.symbol
                      : token.symbol !== from?.symbol
                  )
                  .map((token) => (
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
          <input
            className="bg-transparent font-bold text-right truncate focus-visible:ring-0 focus-visible:outline-none"
            contentEditable={type === "from"}
            disabled={type === "to"}
            onChange={(e) => {
              ctx.setInputValue(e.target.value);
            }}
            placeholder="0.0"
            type="text"
            value={ctx.inputValue}
          />
        </div>
      </div>
    </div>
  );
}
