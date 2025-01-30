import { defineConfig } from "vocs";

export default defineConfig({
  title: "Composer Kit",
  sidebar: [
    {
      text: "Guide",
      collapsed: false,
      items: [
        {
          text: "Installation",
          link: "/installation",
        },
        {
          text: "ComposerKitProvider",
          link: "/composer-kit-provider",
        },
      ],
    },
    {
      text: "Components",
      collapsed: false,
      items: [
        {
          text: "Address",
          link: "/components/address",
        },
        {
          text: "Balance",
          link: "/components/balance",
        },
        {
          text: "Identity",
          link: "/components/identity",
        },
        {
          text: "Payment",
          link: "/components/payment",
        },
        {
          text: "Swap",
          link: "/components/swap",
        },
        {
          text: "TokenSelect",
          link: "/components/token-select",
        },
        {
          text: "Wallet",
          link: "/components/wallet",
        },
      ],
    },
  ],
});
