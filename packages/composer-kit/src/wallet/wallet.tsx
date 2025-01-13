import { ConnectButton } from "@rainbow-me/rainbowkit";
import { createContext, useContext } from "react";

interface WalletContextType {
  account?: {
    displayName: string;
    displayBalance?: string;
    address?: string;
  };
  chain?: {
    hasIcon: boolean;
    iconUrl?: string;
    iconBackground?: string;
    id: number;
    name?: string;
    unsupported?: boolean;
  };
  isConnecting?: boolean;
  isConnected?: boolean;
  isReady: boolean;
  openConnectModal: () => void;
  openChainModal: () => void;
  openAccountModal: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function Wallet({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        const contextValue = {
          account,
          isConnecting: authenticationStatus === "loading",
          chain,
          authenticationStatus,
          isConnected: connected,
          isReady: ready,
          openConnectModal,
          openChainModal,
          openAccountModal,
          mounted,
        };

        return (
          <WalletContext.Provider value={contextValue}>
            <div
              {...(!ready && {
                "aria-hidden": true,
                style: {
                  opacity: 0,
                  pointerEvents: "none",
                  userSelect: "none",
                },
              })}
            >
              {children}
            </div>
          </WalletContext.Provider>
        );
      }}
    </ConnectButton.Custom>
  );
}

export function useWallet(): WalletContextType {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
}
