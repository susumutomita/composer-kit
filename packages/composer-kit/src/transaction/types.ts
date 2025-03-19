import type { Abi, Address } from "viem";

export interface LifeCycleStatus {
  status:
    | "idle"
    | "initiated"
    | "buildingTransaction"
    | "pending"
    | "success"
    | "error";
  message: string;
}

export interface Transaction {
  functionName: string;
  abi: Abi;
  address: Address;
  args: unknown[];
  to?: Address;
}
