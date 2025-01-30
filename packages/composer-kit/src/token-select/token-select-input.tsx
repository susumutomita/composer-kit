import { CommandInput } from "../core/command";

export function TokenSelectInput(
  props: React.HTMLAttributes<HTMLInputElement>
): JSX.Element {
  return <CommandInput placeholder="Search tokens..." {...props} />;
}
