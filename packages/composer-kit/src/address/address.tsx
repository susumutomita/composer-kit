interface AddressProps extends React.HTMLAttributes<HTMLSpanElement> {
  isTruncated?: boolean;
  className?: string;
  address: string;
  copyOnClick?: boolean;
  onCopyComplete?: (message: string) => void;
}

const getTruncatedAddress = (address: string): string => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export function Address({
  isTruncated = false,
  address,
  onCopyComplete,
  copyOnClick = true,
  className,
  ...props
}: AddressProps): JSX.Element | null {
  const handleCopyOnClick = async (): Promise<void> => {
    try {
      if (!copyOnClick) return;
      await navigator.clipboard.writeText(address);
      onCopyComplete?.(address);
    } catch (err: unknown) {
      onCopyComplete?.("Failed to copy address");
    }
  };

  if (!address) return null;

  return (
    <span {...props} className={className} onClick={handleCopyOnClick}>
      {isTruncated ? getTruncatedAddress(address) : address}
    </span>
  );
}
