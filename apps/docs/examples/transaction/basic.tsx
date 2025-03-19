import {
  Transaction,
  TransactionButton,
  TransactionStatus,
} from "@composer-kit/ui/transaction";

export const TransactionBasic = () => {
  return (
    <div className="w-full items-center justify-center flex flex-col gap-4">
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
};
