import { useEffect } from "react";
import { cn } from "../utils/helper";
import { buttonVariants } from "../utils/theme";
import { ConnectButton } from "./connect-button";
import { useWallet } from "./wallet";

interface ConnectProps {
  children: React.ReactNode;
  label: React.ReactNode;
  onConnect?: () => void;
}

export function Connect({
  children,
  label = "Connect Now",
  onConnect,
}: ConnectProps): JSX.Element {
  const { chain, openChainModal, isConnected, openAccountModal } = useWallet();

  useEffect(() => {
    if (isConnected && onConnect) {
      onConnect();
    }
  }, [isConnected, onConnect]);

  const handlePressableClick = (): void => {
    if (isConnected) {
      openAccountModal();
    }
  };

  if (chain?.unsupported) {
    return (
      <button
        className={cn(buttonVariants({}))}
        onClick={openChainModal}
        type="button"
      >
        Wrong network
      </button>
    );
  }

  if (!isConnected) {
    return <ConnectButton label={label} />;
  }

  return (
    <button
      className={cn(
        buttonVariants({
          class: "cursor-pointer",
        })
      )}
      onClick={handlePressableClick}
      type="button"
    >
      {children}
    </button>
  );
}
