import { useWallet } from "./wallet";

interface NameProps extends React.HTMLAttributes<HTMLSpanElement> {
  isTruncated?: boolean;
  className?: string;
}

export function Name({
  isTruncated = true,
  className,
  ...props
}: NameProps): JSX.Element | null {
  const { account } = useWallet();

  if (!account) return null;

  return (
    <span {...props} className={className}>
      {isTruncated ? account.displayName : account.address}
    </span>
  );
}
