import type { Meta, StoryObj } from "@storybook/react";
import { Wallet, Connect, Avatar, Name } from "@composer-kit/ui/wallet";

const meta: Meta<typeof Wallet> = {
  component: Wallet,
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Wallet>;

export const Primary: Story = {
  render: () => {
    return (
      <Wallet>
        <Connect
          label="Connect Now"
          onConnect={() => {
            console.log("Connected");
          }}
        >
          <Avatar />
          <Name />
        </Connect>
      </Wallet>
    );
  },
  name: "Wallet",
  args: {},
};
