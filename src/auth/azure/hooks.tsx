"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";
import { graphConfig, msalInstance } from "./config";
import { fetcher } from "./msGraphFetcher";


export function useAccount() {
  const msal = msalInstance
  const account = msal.getActiveAccount();
  return account;
}

export function useIsAuthenticated() {
  const account = useAccount();
  return !!account;
}


export function useSignOut() {
  const msal = msalInstance
  const handleSignOut = async () => {
    await msal.logoutRedirect();
  };
  return handleSignOut;
}

export function useUserAvatar() {
  
    const { data, error, isLoading } = useSWR<Blob>(
        graphConfig.graphMePhotoEndpoint,
        fetcher,
        {
          revalidateOnFocus: false,
          revalidateOnReconnect: false,
          refreshInterval: 0,
        }
      );
      const [imageSrc, setImageSrc] = useState<string | undefined>();
    
      useEffect(() => {
        if (data && data instanceof Blob) {
          const objectUrl = URL.createObjectURL(data);
          setImageSrc(objectUrl);
          return () => {
            URL.revokeObjectURL(objectUrl);
          };
        }
      }, [data]);
    
      return { imageSrc, isLoading, error };
}
