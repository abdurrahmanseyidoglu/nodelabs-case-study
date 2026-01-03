"use client";
import { useSession } from "next-auth/react";
import BankCardIndex from "@/components/Common/BankCard/BankCardIndex";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <pre>{JSON.stringify(session?.user, null, 2)}</pre>
      </div>
      {/* !TODO: Make this Dynamic via props  */}
      <div className="bg-red-50 p-8">
        <BankCardIndex />
      </div>
    </div>
  );
}
