import { useNFTContext } from "./nft";

export function NFTImage(): JSX.Element {
  const { metadata } = useNFTContext();

  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-lg">
      <img
        alt={metadata?.name || "NFT Image"}
        className="object-cover"
        src={metadata?.image || ""}
      />
    </div>
  );
}
