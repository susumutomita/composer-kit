"use client";

import { cn } from "../utils/helper";

interface NFTCardProps {
  children?: React.ReactNode;
  className?: string;
}

export function NFTCard({ children, className }: NFTCardProps): JSX.Element {
  return (
    <div
      className={cn(
        "max-w-md overflow-hidden border rounded-md p-4 shadow-md",
        className
      )}
    >
      {children}
    </div>
  );
}
