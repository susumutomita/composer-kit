import {
  type Config,
  createConfig,
  type CreateConfigParameters,
  http,
  useConfig as useWagmiConfig,
} from "wagmi";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import { celo, celoAlfajores, mainnet } from "viem/chains";
import { injectedWallet } from "@rainbow-me/rainbowkit/wallets";

interface ConfigContextType {
  wagmiConfig: Config;
  queryClient: QueryClient | null;
}

interface ConfigParams {
  wagmiConfig?: CreateConfigParameters;
}

const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [injectedWallet],
    },
  ],
  {
    appName: "Composer Kit",
    projectId: "044601f65212332475a09bc14ceb3c34",
  }
);

const config = createConfig({
  connectors,
  chains: [celo, celoAlfajores, mainnet],
  transports: {
    [celo.id]: http(),
    [celoAlfajores.id]: http(),
    [mainnet.id]: http(),
  },
});

export const useConfig = ({
  wagmiConfig: wagmiConfigParam,
}: ConfigParams): ConfigContextType => {
  let wagmiConfig: Config;
  let queryClient: QueryClient | null = null;

  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    wagmiConfig = useWagmiConfig();
  } catch (err) {
    if (wagmiConfigParam) {
      wagmiConfig = createConfig(wagmiConfigParam);
    } else {
      wagmiConfig = config;
    }
  }

  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    queryClient = useQueryClient();
  } catch (err) {
    queryClient = new QueryClient();
  }

  return useMemo(
    () => ({
      wagmiConfig,
      queryClient,
    }),
    [wagmiConfig, queryClient]
  );
};
