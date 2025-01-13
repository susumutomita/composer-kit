import { useWallet } from "./wallet";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Avatar({ ...props }: AvatarProps): JSX.Element | null {
  const { chain } = useWallet();

  if (!chain?.hasIcon) return null;

  return (
    <div
      {...props}
      style={{
        background: chain.iconBackground,
        width: 12,
        height: 12,
        borderRadius: 999,
        overflow: "hidden",
        marginRight: 4,
        ...props.style,
      }}
    >
      {chain.iconUrl ? (
        <img
          alt={chain.name ?? "Chain icon"}
          src={chain.iconUrl}
          style={{ width: 12, height: 12 }}
        />
      ) : null}
      {chain.name}
    </div>
  );
}
