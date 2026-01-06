"use client";

import { Session } from "next-auth";
import {
  SessionProvider as NextSessionProvider,
  getSession,
} from "next-auth/react";
import { usePathname } from "next/navigation";
import { ReactNode, useCallback, useEffect, useState } from "react";

// fix redirect not working in production using, source: https://github.com/nextauthjs/next-auth/issues/10016#issuecomment-1985081720
export default function SessionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [session, setSession] = useState<Session | null>(null);
  const pathName = usePathname();

  const fetchSession = useCallback(async () => {
    try {
      const sessionData = await getSession();
      setSession(sessionData);
    } catch (error) {
      setSession(null);
      if (process.env.NODE_ENV === "development") {
        console.error(error);
      }
    }
  }, []);

  useEffect(() => {
    fetchSession();
  }, [fetchSession, pathName]);

  return (
    <NextSessionProvider session={session}>{children}</NextSessionProvider>
  );
}
