import { type UseReadContractReturnType } from "wagmi";
import { cn } from "../utils/helper";
import { buttonVariants } from "../utils/theme";
import { useSwap, type SwapableTokens } from "./swap";

interface SwapButtonProps {
  onSwap: ({
    from,
    to,
    swapAmount,
  }: {
    from: SwapableTokens | undefined;
    to: SwapableTokens | undefined;
    swapAmount: number;
    balanceResponse: {
      balance: string;
      error: string;
      response: UseReadContractReturnType;
    };
  }) => void;
  className?: string;
}

export function SwapButton({
  className,
  onSwap,
}: SwapButtonProps): JSX.Element {
  const { fromAmount, from, to, balanceResponse } = useSwap();
  return (
    <button
      className={cn(
        buttonVariants({
          class: "w-full my-6",
        }),
        className
      )}
      onClick={() => {
        onSwap({
          from,
          to,
          swapAmount: parseFloat(fromAmount),
          balanceResponse,
        });
      }}
      type="button"
    >
      Swap
    </button>
  );
}
