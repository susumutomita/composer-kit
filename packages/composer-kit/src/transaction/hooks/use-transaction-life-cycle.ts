import { useCallback, useState } from "react";
import { type LifeCycleStatus } from "../types";

export function useTransactionLifecycle(): {
  lifeCycleStatus: LifeCycleStatus;
  updateStatus: (status: LifeCycleStatus) => void;
} {
  const [lifeCycleStatus, setLifeCycleStatus] = useState<LifeCycleStatus>({
    message: "",
    status: "idle",
  });

  const updateStatus = useCallback((status: LifeCycleStatus) => {
    setLifeCycleStatus(status);
  }, []);

  return { lifeCycleStatus, updateStatus };
}
