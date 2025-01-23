import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  Payment,
  PaymentButton,
  PaymentError,
  PaymentDialog,
} from "@composer-kit/ui/payment";
import { celo, celoAlfajores } from "viem/chains";

const meta: Meta<typeof Payment> = {
  component: Payment,
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof Payment>;

export const Primary: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [txHash, setTxHash] = useState("");

    return (
      <Payment
        amount="0.001"
        chain={celo}
        onSuccess={(hash) => {
          console.log("Payment successful", hash);
          setTxHash(hash);
        }}
        onError={(error) => {
          console.error("Payment error", error);
        }}
        recipientAddress="0x717F8A0b80CbEDe59EcA195F1E3D8E142C84d4d6"
        tokenAddress="0x765de816845861e75a25fca122bb6898b8b1282a"
      >
        <button
          className="bg-white dark:bg-black text-black dark:text-white px-4 py-2 rounded"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          Paynow
        </button>
        <PaymentDialog
          onOpenChange={() => {
            setIsOpen(!isOpen);
          }}
          open={isOpen}
        />
        <PaymentError />
        {txHash ? <p>{txHash}</p> : null}
      </Payment>
    );
  },
  name: "Payment",
  args: {},
};
