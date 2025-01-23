import { useState, useEffect } from "react";
import { mainnet } from "viem/chains";
import { normalize } from "viem/ens";
import { getPublicClient } from "../../core/internal/config/web3-config";

interface SocialProps {
  ensName: string;
  tag: "github" | "twitter" | "url" | "farcaster";
}

const getSocialUrl = (tag: string, data: string) => {
  switch (tag) {
    case "github":
      return `https://github.com/${data}`;
    case "twitter":
      return `https://x.com/${data}`;
    case "url":
      return data;
    case "farcaster":
      return `https://warpcast.com/${data}`;
    default:
      return null;
  }
};

export const useSocial = ({ ensName, tag }: SocialProps) => {
  const [socialData, setSocialData] = useState<{
    tag: string;
    url: string | null;
  } | null>(null);

  useEffect(() => {
    const fetchSocialData = async () => {
      const client = getPublicClient(mainnet);

      const data = await client.getEnsText({
        name: normalize(ensName),
        key: `com.${tag}`,
      });

      if (data) {
        setSocialData({
          url: getSocialUrl(tag, data),
          tag,
        });
      } else {
        setSocialData(null);
      }
    };

    fetchSocialData();
  }, [ensName]);

  return socialData;
};
