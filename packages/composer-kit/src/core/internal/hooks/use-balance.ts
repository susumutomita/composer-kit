import { useMemo } from "react";
import { erc20Abi, formatUnits, type Address } from "viem";
import { useReadContract, type UseReadContractReturnType } from "wagmi";
import { formatBalance } from "../utils/format-balance";

export const useBalance = ({
  address,
  tokenMetaData,
}: {
  address: Address;
  tokenMetaData: {
    address: Address;
    decimals: number;
  };
}): {
  balance: string;
  error: string;
  response: UseReadContractReturnType;
} => {
  const balanceResponse: UseReadContractReturnType = useReadContract({
    abi: erc20Abi,
    address: tokenMetaData.address,
    functionName: "balanceOf",
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    args: address ? [address] : [],
    query: {
      // eslint-disable-next-line no-implicit-coercion, @typescript-eslint/no-unnecessary-condition
      enabled: !!tokenMetaData.address && !!address,
    },
  });

  return useMemo(() => {
    if (!balanceResponse.data) {
      return {
        balance: "0",
        error: balanceResponse.error?.shortMessage ?? "",
        response: balanceResponse,
      };
    }
    const convertedBalance = formatUnits(
      balanceResponse.data as bigint,
      tokenMetaData.decimals
    );
    return {
      balance: formatBalance(convertedBalance),
      error: "",
      response: balanceResponse,
    };
  }, [balanceResponse, tokenMetaData]);
};
