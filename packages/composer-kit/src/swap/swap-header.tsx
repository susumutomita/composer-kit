import { SettingsIcon } from "lucide-react";
import { cn } from "../utils/helper";
import { buttonVariants } from "../utils/theme";

export function SwapHeader(): JSX.Element {
  return (
    <div className="flex justify-between items-center pb-4">
      <h2 className="font-semibold text-lg">Swap</h2>
      <button
        className={cn(
          buttonVariants({
            variant: "link",
            size: "icon",
          })
        )}
        type="button"
      >
        <SettingsIcon className="w-6 h-6" />
      </button>
    </div>
  );
}
