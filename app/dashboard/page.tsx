"use client";
import { useSession } from "next-auth/react";
import BankCardIndex from "@/components/Common/BankCard/BankCardIndex";
import BalanceCard from "@/components/Common/BalanceCard";
import ClosedWallet from "@/components/icons/ClosedWallet";
import WalletPlus from "@/components/icons/WalletPlus";
export default function Home() {
  const { data: session } = useSession();

  return (
    <div>
      <h1>Dashboard</h1>
      <div className="flex items-center justify-start gap-6.25 flex-wrap">
        <BalanceCard
          icon={ClosedWallet}
          iconColor="var(--color-primary)"
          text="Total balance"
          currencySymbol="$"
          totalBalance={5240.21}
          iconBgClass="bg-[#4E5257]"
          className="bg-[#363A3F]"
          totalBalanceClass="text-white"
        />
        <BalanceCard
          icon={ClosedWallet}
          iconColor="#363A3F"
          text="Total balance"
          currencySymbol="$"
          totalBalance={5240.21}
          iconBgClass="bg-[#EBE8E8]"
          className="bg-[#F8F8F8]"
          totalBalanceClass="text-dark-1"
        />
        <BalanceCard
          icon={WalletPlus}
          iconColor="#363A3F"
          text="Total balance"
          currencySymbol="$"
          totalBalance={5240.21}
          iconBgClass="bg-[#EBE8E8]"
          className="bg-[#F8F8F8]"
          totalBalanceClass="text-dark-1"
        />
      </div>
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
