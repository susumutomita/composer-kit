import { Loader2 } from "lucide-react";
import { cn } from "../utils/helper";
import { buttonVariants } from "../utils/theme";
import { useTransaction } from "./transaction";

interface TransactionButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export function TransactionButton({
  className,
  children,
}: TransactionButtonProps): JSX.Element {
  const { isLoading, onTransaction } = useTransaction();

  return (
    <button
      className={cn(
        buttonVariants({
          class: className,
        })
      )}
      onClick={onTransaction}
      type="button"
    >
      {isLoading ? <Loader2 className="animate-spin" /> : null}
      {children}
    </button>
  );
}
