import type { Meta, StoryObj } from "@storybook/react";
import {
  TokenSelect,
  TokenSelectGroup,
  TokenSelectInput,
  TokenSelectOption,
  TokenSelectDropdown,
} from "@composer-kit/ui/token-select";

const meta: Meta<typeof TokenSelect> = {
  component: TokenSelect,
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof TokenSelect>;

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
];

export const Primary: Story = {
  render: () => {
    return (
      <TokenSelect delayMs={300}>
        <TokenSelectDropdown placeholder="Search tokens...">
          <TokenSelectInput placeholder="Search Token" />
          <TokenSelectGroup heading="Available tokens">
            {tokens.map((token) => (
              <TokenSelectOption
                key={token.address}
                token={token}
                // Example of custom rendering
                // children={
                //   <div className="flex items-center gap-2">
                //     <img
                //       src={`/tokens/${token.symbol}.png`}
                //       alt={token.symbol}
                //     />
                //     <span>{token.symbol}</span>
                //   </div>
                // }
              />
            ))}
          </TokenSelectGroup>
        </TokenSelectDropdown>
      </TokenSelect>
    );
  },
  name: "Token Select",
  args: {},
};
