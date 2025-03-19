import type { Meta, StoryObj } from "@storybook/react";
import { Address } from "@composer-kit/ui/address";
import {
  Transaction,
  TransactionButton,
  TransactionStatus,
} from "@composer-kit/ui/transaction";

const meta: Meta<typeof Address> = {
  component: Address,
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Address>;

export const Primary: Story = {
  render: () => {
    return (
      <div>
        <Transaction
          chainId={42220}
          onError={(error: any) => {
            console.log("error", error);
          }}
          onSuccess={(result: any) => {
            console.log("result", result);
          }}
          transaction={{
            abi: [
              {
                name: "transfer",
                type: "function",
                stateMutability: "nonpayable",
                inputs: [
                  { name: "recipient", type: "address" },
                  { name: "amount", type: "uint256" },
                ],
                outputs: [{ name: "", type: "bool" }],
              },
            ],
            address: "0x765de816845861e75a25fca122bb6898b8b1282a",
            args: ["0x717F8A0b80CbEDe59EcA195F1E3D8E142C84d4d6", 1],
            functionName: "transfer",
          }}
        >
          <TransactionButton>Send</TransactionButton>
          <TransactionStatus />
        </Transaction>
      </div>
    );
  },
  name: "Transaction",
  args: {},
};
