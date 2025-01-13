import { useBalance } from "../core/internal/hooks/use-balance";
import { UTILITY_TOKENS } from "../core/internal/utils/constants";
import { cn } from "../utils/helper";
import { useIdentity } from "./indentity";

interface BalanceProps extends React.HTMLAttributes<HTMLParagraphElement> {
  precison?: number;
}

export function Balance({
  className,
  precison = 3,
  ...props
}: BalanceProps): JSX.Element | null {
  const { address, token } = useIdentity();
  const { balance } = useBalance({
    address,
    tokenMetaData: UTILITY_TOKENS[token],
  });

  return (
    <p {...props} className={cn("text-sm", className)}>
      {`${parseFloat(balance).toFixed(precison)} ${token}`}
    </p>
  );
}
