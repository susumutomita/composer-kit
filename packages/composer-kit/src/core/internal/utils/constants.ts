export const CUSD_ADDRESS = "0x765de816845861e75a25fca122bb6898b8b1282a";
export const USDT_ADDRESS = "0x48065fbBE25f71C9282ddf5e1cD6D6A887483D5e";
export const CELO_ADDRESS = "0x471ece3750da237f93b8e339c536989b8978a438";

export const UTILITY_TOKENS = {
  cUSD: {
    address: CUSD_ADDRESS,
    decimals: 18,
  },
  USDT: {
    address: USDT_ADDRESS,
    decimals: 6,
  },
  CELO: {
    address: CELO_ADDRESS,
    decimals: 18,
  },
} as const;
