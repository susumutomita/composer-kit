import { cn } from "../utils/helper";
import { buttonVariants } from "../utils/theme";
import { useWallet } from "./wallet";

interface ConnectButtonProps {
  label: React.ReactNode;
}

export function ConnectButton({
  label = "Connect Wallet",
}: ConnectButtonProps): JSX.Element {
  const { openConnectModal } = useWallet();

  return (
    <button
      className={cn(buttonVariants({}))}
      onClick={openConnectModal}
      type="button"
    >
      {label}
    </button>
  );
}
