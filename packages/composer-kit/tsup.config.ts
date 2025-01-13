import { defineConfig } from "tsup";

export default defineConfig((options) => ({
  entry: ["src/**/index.ts"], // Change from "src/**" to specific entry point
  outDir: "dist",
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  minify: true,
  external: [
    "react",
    "react-dom",
    "@rainbow-me/rainbowkit",
    "viem",
    "@tanstack/react-query",
    "wagmi",
  ],
  esbuildOptions(options) {
    options.outbase = "src";
    options.jsx = "automatic"; // Change from "transform" to "automatic" for modern React
  },
  jsxFactory: "React.createElement",
  jsxFragment: "React.Fragment",
  ...options,
}));
