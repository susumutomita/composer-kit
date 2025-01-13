import type { Meta, StoryObj } from "@storybook/react";
import { Avatar, Identity, Name, Social } from "@composer-kit/ui/identity";
import {
  Balance,
  BalanceInput,
  BalanceOptions,
  BalanceText,
} from "@composer-kit/ui/balance";

const meta: Meta<typeof Identity> = {
  component: Identity,
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Identity>;

const tokens = [
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
      <Balance>
        <div className="flex gap-2">
          <BalanceOptions tokens={tokens} />
          <BalanceInput />
        </div>
        <BalanceText />
      </Balance>
    );
  },
  name: "Balance",
  args: {},
};
