/**
 * ウォレット関連の型定義
 */

/**
 * ウォレットアドレス取得フックの戻り値
 */
export interface UseAddressReturn {
  address: string | undefined;
  isConnected: boolean;
  isConnecting: boolean;
  error: Error | undefined;
}
