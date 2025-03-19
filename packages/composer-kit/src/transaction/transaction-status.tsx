import React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "../utils/helper";
import { useTransaction } from "./transaction";

interface TransactionStatusProps {
  render?: (status: { message: string; status: string }) => React.ReactNode;
  className?: string;
}

export function TransactionStatus({
  render,
  className,
}: TransactionStatusProps): JSX.Element {
  const { lifeCycleStatus } = useTransaction();

  if (render) {
    return <>{render(lifeCycleStatus)}</>;
  }

  return (
    <div
      className={cn(
        "flex items-center gap-2 p-3 rounded-md text-sm",
        className,
        {
          "bg-blue-100 text-blue-800": lifeCycleStatus.status === "pending",
          "bg-green-100 text-green-800": lifeCycleStatus.status === "success",
          "bg-red-100 text-red-800": lifeCycleStatus.status === "error",
        }
      )}
    >
      {lifeCycleStatus.status === "pending" ||
        (lifeCycleStatus.status === "buildingTransaction" && (
          <Loader2 className="animate-spin" />
        ))}
      <span>{lifeCycleStatus.message}</span>
    </div>
  );
}
