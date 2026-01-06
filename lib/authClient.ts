"use client";
import { signOut as nextAuthSignOut } from "next-auth/react";

export async function logout() {
  await nextAuthSignOut({ callbackUrl: "/signin" });
}
