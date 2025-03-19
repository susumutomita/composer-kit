import {
  BalanceInput,
  BalanceOptions,
  BalanceText,
} from "@composer-kit/ui/balance";
import { Balance } from "@composer-kit/ui/identity";
import { swapableTokens } from "../../utils/constants";

export const BalanceBasic = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-96 p-4 bg-white dark:bg-black rounded-lg shadow-lg">
        <Balance>
          <div className="flex flex-col gap-4">
            <BalanceOptions tokens={swapableTokens} />
            <BalanceInput />
          </div>
          <div className="mt-4">
            <BalanceText />
          </div>
        </Balance>
      </div>
    </div>
  );
};
