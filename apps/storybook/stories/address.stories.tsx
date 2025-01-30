import type { Meta, StoryObj } from "@storybook/react";
import { Address } from "@composer-kit/ui/address";

const meta: Meta<typeof Address> = {
  component: Address,
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Address>;

export const Primary: Story = {
  render: () => {
    return (
      <Address
        address="0x208B03553D46A8A16ed53e8632743249dd2E79c3"
        onCopyComplete={(copyMessage: string) => {
          console.log(copyMessage);
        }}
      />
    );
  },
  name: "Address",
  args: {},
};
