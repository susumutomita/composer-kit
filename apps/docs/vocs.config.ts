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
          text: "Wallet",
          link: "/components/wallet",
        },
        {
          text: "Swap",
          link: "/components/swap",
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
          text: "TokenSelect",
          link: "/components/token-select",
        },
        {
          text: "Payment",
          link: "/components/payment",
        },
      ],
    },
  ],
});
