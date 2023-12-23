"use client";

import {NetflixApp} from '../components/client/NetflixApp';
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {

  const session = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session?.status === "unauthenticated") {
      router.push("/auth");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);
  if (session?.status === "loading") {
    return <div>Chargement...</div>;
  }
  if (session?.status === "authenticated") {
    return (
            <NetflixApp />
    );
  } else {
    <></>;
  }
}
