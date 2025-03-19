import { useNFTContext } from "./nft";

export function NFTTokenId(): JSX.Element {
  const { tokenId } = useNFTContext();

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">Token ID</span>
      <span className="font-medium">{tokenId?.toString() || "N/A"}</span>
    </div>
  );
}
