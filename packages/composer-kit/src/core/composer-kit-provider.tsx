import "@rainbow-me/rainbowkit/styles.css";
import type { Chain } from "viem";
import { createContext, useContext, useMemo } from "react";
import {
  darkTheme,
  lightTheme,
  RainbowKitProvider,
  type Theme,
} from "@rainbow-me/rainbowkit";
import { type CreateConfigParameters, WagmiProvider } from "wagmi";
import { celo } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useConfig } from "./use-config";

interface ComposerKitProvider {
  chain?: Chain;
  rpcUrl?: string;
  children: React.ReactNode;
  colorMode?: "light" | "dark";
  config?: CreateConfigParameters;
}

interface ComposerKitContextType {
  chain?: Chain;
  rpcUrl?: string;
}

const ComposerKitContext = createContext<ComposerKitContextType | undefined>({
  chain: celo,
  rpcUrl: celo.rpcUrls.default.http[0],
});

function ComposerKitProvider({
  chain,
  rpcUrl,
  children,
  colorMode = "light",
  config: configProp,
}: ComposerKitProvider): JSX.Element {
  const rainbowKitProps: {
    theme?: Theme | null;
  } = {
    theme: lightTheme(),
  };
  const { queryClient: reactQueryClientFetched, wagmiConfig } = useConfig({
    wagmiConfig: configProp,
  });

  if (colorMode === "dark") {
    rainbowKitProps.theme = darkTheme();
  }

  const queryClientToUse = useMemo(() => {
    return reactQueryClientFetched || new QueryClient();
  }, [reactQueryClientFetched]);

  const wagmiConfigToUse = useMemo(() => {
    return wagmiConfig;
  }, [wagmiConfig]);

  return (
    <WagmiProvider config={wagmiConfigToUse}>
      <QueryClientProvider client={queryClientToUse}>
        <RainbowKitProvider {...rainbowKitProps}>
          <ComposerKitContext.Provider value={{ chain, rpcUrl }}>
            {children}
          </ComposerKitContext.Provider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

const useComposerKit = (): ComposerKitContextType => {
  const context = useContext(ComposerKitContext);
  if (context === undefined) {
    throw new Error("useComposerKit must be used within a ComposerKitProvider");
  }
  return context;
};

export { ComposerKitProvider, ComposerKitContext, useComposerKit };
