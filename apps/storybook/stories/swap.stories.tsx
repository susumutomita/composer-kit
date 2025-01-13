import type { Meta, StoryObj } from "@storybook/react";
import { Swap, SwapToggle, SwapToken } from "@composer-kit/ui/swap";

const meta: Meta<typeof Swap> = {
  component: Swap,
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Swap>;

const swapableTokens = [
  {
    address: "0x765de816845861e75a25fca122bb6898b8b1282a",
    chainId: 42220,
    decimals: 18,
    name: "cUSD",
    symbol: "cUSD",
  },
  {
    address: "0x48065fbBE25f71C9282ddf5e1cD6D6A887483D5e",
    chainId: 42220,
    decimals: 6,
    name: "USDT",
    symbol: "USDT",
  },
  {
    chainId: 42220,
    symbol: "CELO",
    name: "Celo",
    address: "0x471ece3750da237f93b8e339c536989b8978a438",
    decimals: 18,
  },
];

export const Primary: Story = {
  render: () => {
    return (
      <Swap>
        <SwapToken label="Sell" swapableTokens={swapableTokens} type="from" />
        <SwapToggle />
        <SwapToken label="Buy" swapableTokens={swapableTokens} type="to" />
      </Swap>
    );
  },
  name: "Swap",
  args: {},
};
