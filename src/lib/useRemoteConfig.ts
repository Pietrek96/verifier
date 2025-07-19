import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const configURL =
  "https://raw.githubusercontent.com/ton-community/contract-verifier-config/main/config.json";

export function useRemoteConfig() {
  const [enabled, setEnabled] = useState(true);

  return useQuery(
    ["remoteConfig"],
    async () => {
      const { funcVersions, tactVersions, tolkVersions } = await (await fetch(configURL)).json();

      setEnabled(false);

      return {
        funcVersions: funcVersions as string[],
        tactVersions: tactVersions as string[],
        tolkVersions: tolkVersions as string[],
      };
    },
    { enabled, initialData: { funcVersions: [], tactVersions: [], tolkVersions: [] } },
  );
}
