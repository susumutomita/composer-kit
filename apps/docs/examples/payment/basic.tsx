import { useState } from "react";
import { Payment, PaymentError, PaymentDialog } from "@composer-kit/ui/payment";
import { celo } from "viem/chains";

export const PaymentBasic = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [txHash, setTxHash] = useState("");

  return (
    <div className="w-full items-center justify-center flex flex-col gap-4">
      <Payment
        amount="0.001"
        //@ts-ignore
        chain={celo}
        onSuccess={(hash) => {
          setTxHash(hash);
          setIsOpen(false);
        }}
        onError={(error) => {
          console.error("Payment error", error);
        }}
        recipientAddress="0x717F8A0b80CbEDe59EcA195F1E3D8E142C84d4d6"
        tokenAddress="0x765de816845861e75a25fca122bb6898b8b1282a"
      >
        <button
          className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded"
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
      </Payment>
      {txHash && <p>{txHash}</p>}
    </div>
  );
};
