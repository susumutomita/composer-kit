import { ComposerKitProvider } from "@composer-kit/ui/core";
import "./styles.css";

export default function Root({ children }: { children: React.ReactNode }) {
  return <ComposerKitProvider>{children}</ComposerKitProvider>;
}
