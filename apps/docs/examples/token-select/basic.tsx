import {
  TokenSelect,
  TokenSelectDropdown,
  TokenSelectGroup,
  TokenSelectInput,
  TokenSelectOption,
} from "@composer-kit/ui/token-select";
import { swapableTokens } from "../../utils/constants";

export const TokenSelectBasic = () => {
  return (
    <div className="flex items-center justify-center">
      <TokenSelect delayMs={300}>
        <TokenSelectDropdown placeholder="Search tokens...">
          <TokenSelectInput />
          <TokenSelectGroup heading="Available tokens">
            {swapableTokens.map((token) => (
              <TokenSelectOption key={token.address} token={token} />
            ))}
          </TokenSelectGroup>
        </TokenSelectDropdown>
      </TokenSelect>
    </div>
  );
};
