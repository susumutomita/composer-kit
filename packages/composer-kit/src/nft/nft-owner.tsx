import { Copy } from "lucide-react";
import { useNFTContext } from "./nft";

interface OwnerProps {
  copyOnClick?: boolean;
  onCopyComplete?: (message: string) => void;
}

export function Owner({
  copyOnClick,
  onCopyComplete,
}: OwnerProps): JSX.Element {
  const { owner } = useNFTContext();

  const truncateAddress = (address: string): string => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const copyToClipboard = async (content: string): Promise<void> => {
    try {
      if (!copyOnClick) return;
      await navigator.clipboard.writeText(content);
      onCopyComplete?.(content);
    } catch (err: unknown) {
      onCopyComplete?.("Failed to copy address");
    }
  };

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">Owner</span>
      <div className="flex items-center gap-2">
        <span className="font-medium">
          {owner ? truncateAddress(owner) : "N/A"}
        </span>
        {owner && (
          <button onClick={() => copyToClipboard(owner)} type="button">
            <Copy className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
