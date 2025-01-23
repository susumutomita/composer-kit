import { ChevronDown } from "lucide-react";
import { Command } from "../core/command";
import { Popover, PopoverContent, PopoverTrigger } from "../core/popover";
import { cn } from "../utils/helper";
import { buttonVariants } from "../utils/theme";
import { useTokenSelect } from "./token-select";

interface TokenSelectDropdownProps {
  children: React.ReactNode;
  className?: string;
  placeholder: string;
}

export function TokenSelectDropdown({
  children,
  className,
  placeholder,
}: TokenSelectDropdownProps): JSX.Element {
  const { open, selectedToken, setOpen } = useTokenSelect();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          aria-expanded={open}
          className={cn(
            buttonVariants({
              variant: "outline",
              class: "w-[200px] justify-between",
            }),
            className
          )}
          role="combobox"
        >
          {selectedToken ? (
            <span className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                {selectedToken.symbol.charAt(0)}
              </div>
              {selectedToken.symbol}
            </span>
          ) : (
            placeholder
          )}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command className="w-full">{children}</Command>
      </PopoverContent>
    </Popover>
  );
}
