import {
  NFT,
  NFTCard,
  NFTImage,
  NFTMeta,
  NFTMint,
  NFTTokenId,
} from "@composer-kit/ui/nft";

export const NftMint = () => {
  return (
    <div className="flex items-center justify-center">
      <NFT
        contractAddress="0xd447209176470be0db276549c7143265a559Fb6b"
        tokenId={BigInt("2334")}
      >
        <NFTCard>
          <NFTMeta />
          <NFTImage />
          <NFTTokenId />
          <NFTMint />
        </NFTCard>
      </NFT>
    </div>
  );
};
