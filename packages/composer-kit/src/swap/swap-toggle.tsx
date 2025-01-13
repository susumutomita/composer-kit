import { useState } from "react";
import { ArrowBigDown } from "lucide-react";
import { cn } from "../utils/helper";
import { buttonVariants } from "../utils/theme";
import { useSwap } from "./swap";

export function SwapToggle(): JSX.Element {
  const { handleToggle } = useSwap();

  const [isRotated, setIsRotated] = useState(false);

  const onToggle = (): void => {
    handleToggle();
  };

  return (
    <div className="flex items-center justify-center w-full p-4">
      <button
        className={cn(
          buttonVariants({
            size: "icon",
            variant: "outline",
            class: "rounded-full",
          })
        )}
        onClick={onToggle}
        onMouseEnter={() => {
          setIsRotated(true);
        }}
        onMouseLeave={() => {
          setIsRotated(false);
        }}
        type="button"
      >
        <ArrowBigDown
          className={`w-6 h-6 transform transition-transform duration-300 ease-in-out ${
            isRotated ? "rotate-180" : ""
          }`}
        />
      </button>
    </div>
  );
}
