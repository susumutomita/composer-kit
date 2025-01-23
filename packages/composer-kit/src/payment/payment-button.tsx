import { Loader2 } from "lucide-react";
import { cn } from "../utils/helper";
import { buttonVariants } from "../utils/theme";
import { usePayment } from "./payment";

interface PaymentButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export function PaymentButton({
  className,
  children,
}: PaymentButtonProps): JSX.Element {
  const { handlePayment, isLoading } = usePayment();

  return (
    <button
      className={cn(
        buttonVariants({
          class: className,
        })
      )}
      disabled={isLoading}
      onClick={handlePayment}
      type="button"
    >
      {isLoading ? <Loader2 className="animate-spin" /> : null}
      {children}
    </button>
  );
}
