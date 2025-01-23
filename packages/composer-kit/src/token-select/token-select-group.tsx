import { CommandEmpty, CommandGroup, CommandList } from "../core/command";

interface TokenSelectGroupProps {
  children: React.ReactNode;
  emptyMessage?: string;
  heading?: string;
}

export function TokenSelectGroup({
  children,
  emptyMessage = "No tokens found.",
  heading,
}: TokenSelectGroupProps): JSX.Element {
  return (
    <CommandList className="w-full">
      <CommandEmpty>{emptyMessage}</CommandEmpty>
      <CommandGroup heading={heading}>{children}</CommandGroup>
    </CommandList>
  );
}
