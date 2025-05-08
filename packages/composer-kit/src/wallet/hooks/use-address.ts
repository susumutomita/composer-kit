import { useAccount } from "wagmi";
import { useMemo } from "react";
import type { UseAddressReturn } from "../types";

/**
 * ウォレットアドレス取得フック
 *
 * @returns オブジェクト:
 *   - address: string | undefined
 *   - isConnected: boolean
 *   - isConnecting: boolean
 *   - error: Error | undefined
 */
export function useAddress(): UseAddressReturn {
  const { address, status } = useAccount(); // wagmi v2
  const isConnected = status === "connected";
  const isConnecting = status === "connecting" || status === "reconnecting";
  const error = undefined; // Since wagmi v2 doesn't return error directly

  // 参照同一性を保って不要レンダリングを防止
  return useMemo<UseAddressReturn>(
    () => ({ address, isConnected, isConnecting, error }),
    [address, isConnected, isConnecting, error],
  );
}
