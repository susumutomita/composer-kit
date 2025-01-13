import { defineConfig } from "vocs";

export default defineConfig({
  title: "Docs",
  sidebar: [
    {
      text: "Installation",
      link: "/installation",
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
      ],
    },
  ],
});
