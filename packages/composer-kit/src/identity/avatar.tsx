import React from "react";
import { useIdentity } from "./indentity";

function DefaultAvatar(): JSX.Element {
  return (
    <svg
      fill="none"
      height="40"
      viewBox="0 0 40 40"
      width="40"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clipRule="evenodd"
        d="M5.00778 17.7143C3.16266 16.0662 2.0011 13.6687 2.0011 11C2.0011 6.02944 6.03054 2 11.0011 2C15.9717 2 20.0011 6.02944 20.0011 11C20.0011 13.6687 18.8395 16.0662 16.9944 17.7143C16.88 15.2738 15.3075 13.2145 13.1284 12.388C14.2534 11.6802 15.0011 10.4274 15.0011 9C15.0011 6.79086 13.2102 5 11.0011 5C8.79196 5 7.0011 6.79086 7.0011 9C7.0011 10.4274 7.74875 11.6802 8.87381 12.388C6.69469 13.2145 5.12219 15.2738 5.00778 17.7143ZM5.57936 20.5732C2.24834 18.6827 0.00109863 15.1038 0.00109863 11C0.00109863 4.92487 4.92597 0 11.0011 0C17.0762 0 22.0011 4.92487 22.0011 11C22.0011 15.1038 19.7539 18.6827 16.4228 20.5732C16.3637 20.6068 16.3042 20.6399 16.2444 20.6724C14.6857 21.5191 12.8996 22 11.0011 22C9.02974 22 7.1795 21.4814 5.57936 20.5732Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
}

export function Avatar(): JSX.Element {
  const { avatar, name: ensName } = useIdentity();

  return (
    <>
      {avatar ? (
        <img
          alt={`${ensName}-avatar`}
          className="rounded-full h-10 w-10"
          src={avatar}
        />
      ) : (
        <DefaultAvatar />
      )}
    </>
  );
}
