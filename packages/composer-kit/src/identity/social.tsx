import { useSocial } from "./hooks/use-social";
import { useIdentity } from "./indentity";

interface SocialProps extends React.HTMLAttributes<HTMLAnchorElement> {
  tag: "github" | "twitter" | "url" | "farcaster";
}

export function Social({
  className,
  tag,
  children,
  ...props
}: SocialProps): JSX.Element | null {
  const { name } = useIdentity();
  const data = useSocial({
    ensName: name,
    tag,
  });

  if (!data) return null;

  return (
    <a href={data?.url ?? "#"} target="_blank" className={className} {...props}>
      {children ?? tag}
    </a>
  );
}
