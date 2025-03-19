import { useNFTContext } from "./nft";

export function NFTMeta(): JSX.Element {
  const { metadata } = useNFTContext();

  return (
    <div>
      <p className="text-xl font-bold">{metadata?.name || "Unknown NFT"}</p>
      <p className="line-clamp-2">
        {metadata?.description || "No description available"}
      </p>
    </div>
  );
}
