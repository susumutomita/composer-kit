import React, {
  createContext,
  useContext,
  useMemo,
  type HTMLAttributes,
} from "react";
import { type Address } from "viem";
import { mainnet } from "viem/chains";
import { useEnsAvatar, useEnsName } from "wagmi";

interface IdentityProps extends HTMLAttributes<HTMLDivElement> {
  address: Address;
  token?: "CELO" | "cUSD" | "USDT";
}

interface IdentityContextType {
  address: Address;
  name: string;
  avatar: string;
  balance: string;
  token: "CELO" | "cUSD" | "USDT";
}

const IdentityContext = createContext<IdentityContextType | null>(null);

export function Identity({
  children,
  token = "CELO",
  address,
  ...props
}: IdentityProps): JSX.Element {
  const { data: ensName, isLoading: isEnsLoading } = useEnsName({
    address,
    chainId: mainnet.id,
    query: {
      enabled: true,
    },
  });
  const { data: avatar, isLoading: isAvatarLoading } = useEnsAvatar({
    name: ensName ?? "",
    chainId: mainnet.id,
  });

  const contextValue = useMemo(() => {
    return {
      address,
      name: ensName ?? "",
      avatar: avatar ?? "",
      balance: "0",
      token,
    };
  }, [address, avatar, ensName, token]);

  if (isEnsLoading || isAvatarLoading) {
    return <div />;
  }

  return (
    <IdentityContext.Provider value={contextValue}>
      <div {...props}> {children}</div>
    </IdentityContext.Provider>
  );
}

export const useIdentity = (): IdentityContextType => {
  const context = useContext(IdentityContext);

  if (!context) {
    throw new Error("useIdentity must be used within an IdentityProvider");
  }

  return context;
};
