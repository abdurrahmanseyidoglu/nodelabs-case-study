"use client";

import { SessionProvider } from "next-auth/react";

export default function _SessionProvider({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
