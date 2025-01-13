import { cn } from "../utils/helper";
import { useIdentity } from "./indentity";

interface NameProps extends React.HTMLAttributes<HTMLParagraphElement> {
  isTruncated?: boolean;
}

const getTruncatedAddress = (address: string): string => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export function Name({
  isTruncated = true,
  className,
  ...props
}: NameProps): JSX.Element | null {
  const { address, name } = useIdentity();

  return (
    <p {...props} className={cn("font-bold text-base", className)}>
      {name || isTruncated ? getTruncatedAddress(address) : address}
    </p>
  );
}
