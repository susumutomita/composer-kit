import {
  Avatar,
  Balance,
  Identity,
  Name,
  Social,
} from "@composer-kit/ui/identity";

export const IdentityBasic = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-auto p-6 bg-white dark:bg-black rounded-lg shadow-lg min-w-[200px]">
        <Identity
          address="0xE1061b397cC3C381E95a411967e3F053A7c50E70"
          className="flex gap-4 items-center"
          token="cUSD"
        >
          <Avatar />
          <div className="flex flex-col">
            <Name />
            <Balance />
          </div>
          <Social tag="twitter" />
        </Identity>
      </div>
    </div>
  );
};
