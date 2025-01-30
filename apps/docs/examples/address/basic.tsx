import { Address } from "@composer-kit/ui/address";
import { useState } from "react";

export const Basic = () => {
  const [isCopied, setIsCopied] = useState(false);
  return (
    <div>
      <Address
        address="0x208B03553D46A8A16ed53e8632743249dd2E79c3"
        className="bg-white dark:bg-black p-2 rounded-md font-semibold"
        onCopyComplete={() => {
          setIsCopied(true);
          setTimeout(() => {
            setIsCopied(false);
          }, 1000);
        }}
      />
      {isCopied && (
        <p className="mt-2 text-white dark:text-black bg-black dark:bg-white p-1 font-medium text-sm text-center w-[4rem] rounded-md">
          Copied
        </p>
      )}
    </div>
  );
};
