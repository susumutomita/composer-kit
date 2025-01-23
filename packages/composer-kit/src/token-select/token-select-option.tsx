import { Check } from "lucide-react";
import { CommandItem } from "../core/command";
import { cn } from "../utils/helper";
import { type Token, useTokenSelect } from "./token-select";

interface TokenSelectOptionProps {
  className?: string;
  children?: React.ReactNode;
  onSelect?: (token: Token) => void;
  token: Token;
}

export function TokenSelectOption({
  className,
  children,
  onSelect,
  token,
}: TokenSelectOptionProps): JSX.Element {
  const { selectedToken, setOpen, setSelectedToken } = useTokenSelect();

  return (
    <CommandItem
      className={className}
      onSelect={() => {
        setSelectedToken(token);
        onSelect?.(token);
        setOpen(false);
      }}
      value={`${token.name} ${token.symbol}`}
    >
      {children || (
        <>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
              {token.symbol.charAt(0)}
            </div>
            <span>{token.name}</span>
            <span className="text-gray-500">({token.symbol})</span>
          </div>
          <Check
            className={cn(
              "ml-auto h-4 w-4",
              selectedToken?.address === token.address
                ? "opacity-100"
                : "opacity-0"
            )}
          />
        </>
      )}
    </CommandItem>
  );
}
