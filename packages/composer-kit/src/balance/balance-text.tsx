import { Address } from "viem";
import { useBalance } from "../core/internal/hooks/use-balance";
import { UTILITY_TOKENS } from "../core/internal/utils/constants";
import { cn } from "../utils/helper";
import { useBalance as useBalanceCtx } from "./balance";

interface BalanceTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  precison?: number;
}

export function BalanceText({
  className,
  precison = 3,
  ...props
}: BalanceTextProps): JSX.Element | null {
  const { address, selectedToken } = useBalanceCtx();
  const { balance } = useBalance({
    address: address!,
    tokenMetaData: {
      address: selectedToken?.address as Address,
      decimals: selectedToken?.decimals!,
    },
  });

  if (!selectedToken || !address) {
    return (
      <p {...props} className={cn("mt-2 font-bold text-sm", className)}>
        Enter a valid address and select a token
      </p>
    );
  }

  return (
    <p {...props} className={cn("mt-2 font-bold text-sm", className)}>
      {`${parseFloat(balance).toFixed(precison)} ${selectedToken?.symbol}`}
    </p>
  );
}
