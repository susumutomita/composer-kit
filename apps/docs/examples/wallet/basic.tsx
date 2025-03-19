import { Avatar, Connect, Name, Wallet } from "@composer-kit/ui/wallet";

export const WalletBasic = () => {
  return (
    <div className="flex items-center justify-center">
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
    </div>
  );
};
