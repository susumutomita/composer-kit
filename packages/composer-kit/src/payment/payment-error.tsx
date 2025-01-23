import { AlertCircle } from "lucide-react";
import { usePayment } from "./payment";

export function PaymentError(): JSX.Element | null {
  const { error } = usePayment();

  if (!error) return null;

  return (
    <div className="flex items-center gap-2 text-red-500">
      <AlertCircle className="h-4 w-4" />
      <span className="text-sm">{error}</span>
    </div>
  );
}
