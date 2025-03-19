import {
  Swap,
  SwapButton,
  SwapHeader,
  SwapToggle,
  SwapToken,
} from "@composer-kit/ui/swap";
import { swapableTokens } from "../../utils/constants";

export const SwapBasic = () => {
  return (
    <div className="flex items-center justify-center">
      <Swap>
        <SwapHeader />
        <SwapToken label="Sell" swapableTokens={swapableTokens} type="from" />
        <SwapToggle />
        <SwapToken label="Buy" swapableTokens={swapableTokens} type="to" />
        <SwapButton onSwap={() => {}} />
      </Swap>
    </div>
  );
};
