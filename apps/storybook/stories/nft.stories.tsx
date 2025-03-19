import type { Meta, StoryObj } from "@storybook/react";
import { Address } from "@composer-kit/ui/address";
import {
  NFT,
  NFTCard,
  NFTImage,
  NFTMeta,
  NFTMint,
  NFTTokenId,
} from "@composer-kit/ui/nft";

const meta: Meta<typeof Address> = {
  component: Address,
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Address>;

export const Primary: Story = {
  render: () => {
    return (
      <NFT
        contractAddress="0xd447209176470be0db276549c7143265a559Fb6b"
        tokenId={BigInt("2334")}
      >
        <NFTCard>
          <NFTMeta />
          <NFTImage />
          <NFTTokenId />
          {/* <NFTMint /> */}
        </NFTCard>
      </NFT>
    );
  },
  name: "NFT",
  args: {},
};
