"use client";
import BalanceCard from "@/components/Common/BalanceCard";
import ClosedWallet from "@/components/icons/ClosedWallet";
import WalletPlus from "@/components/icons/WalletPlus";
import {
  _getWallet,
  _getFinancialSummary,
  _getScheduledTransfers,
  _getWorkingCapital,
  _getRecentTransactions,
} from "@/lib/apiActions";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import PrimaryCard from "@/components/Common/BankCard/PrimaryCard";
import SecondaryCard from "@/components/Common/BankCard/SecondaryCard";
import {
  WalletResponse,
  FinancialSummaryResponse,
  WalletCard,
  ScheduledTransfersResponse,
  WorkingCapitalResponse,
  RecentTransactionsResponse,
} from "@/types/ApiResponse";
import SkeletonLoaders from "@/components/DashboardComponents/SkeletonLoaders";
import dynamic from "next/dynamic";
import WorkingCapital from "@/components/DashboardComponents/WorkingCapital";
import RecentTransactions from "@/components/DashboardComponents/RecentTransactions";
import ScheduledTransfers from "@/components/DashboardComponents/ScheduledTransfers";

const GoogleSignInMessage = dynamic(
  () => import("@/components/DashboardComponents/GoogleSignInMessage"),
  { ssr: false }
);

export default function Home() {
  const { data: session } = useSession();
  const [wallet, setWallet] = useState<WalletResponse | null>(null);
  const [financialSummary, setFinancialSummary] =
    useState<FinancialSummaryResponse | null>(null);
  const [scheduledTransfers, setScheduledTransfers] =
    useState<ScheduledTransfersResponse | null>(null);
  const [workingCapital, setWorkingCapital] =
    useState<WorkingCapitalResponse | null>(null);
  const [recentTransactions, setRecentTransactions] =
    useState<RecentTransactionsResponse | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (session?.user?.accessToken) {
        try {
          const [
            walletData,
            summaryData,
            transfersData,
            workingCapitalData,
            recentTransactionsData,
          ] = await Promise.all([
            _getWallet(session?.user?.accessToken),
            _getFinancialSummary(session?.user?.accessToken),
            _getScheduledTransfers(session?.user?.accessToken),
            _getWorkingCapital(session?.user?.accessToken),
            _getRecentTransactions(session?.user?.accessToken, 3),
          ]);
          setWallet(walletData);
          setFinancialSummary(summaryData);
          setScheduledTransfers(transfersData);
          setWorkingCapital(workingCapitalData);
          setRecentTransactions(recentTransactionsData);
        } catch (error) {
          console.error("Failed to fetch data:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [session?.user?.accessToken]);

  if (isLoading && session?.user?.accessToken) {
    return <SkeletonLoaders />;
  } else {
    return (
      <div className="">
        {!session?.user?.accessToken && <GoogleSignInMessage />}
        <div className="flex items-start justify-between gap-8.75 flex-wrap xl:flex-nowrap">
          {/* Left Side */}
          <div className="grow min-w-0">
            {/* Balance Cards */}
            <div className="flex items-center justify-start gap-6.25 flex-wrap grow">
              <BalanceCard
                icon={ClosedWallet}
                iconColor="var(--color-primary)"
                text="Total balance"
                currencySymbol={
                  financialSummary?.data?.totalBalance?.currency || "$"
                }
                totalBalance={financialSummary?.data?.totalBalance?.amount || 0}
                iconBgClass="bg-[#4E5257]"
                className="bg-[#363A3F]"
                totalBalanceClass="text-white"
              />
              <BalanceCard
                icon={ClosedWallet}
                iconColor="#363A3F"
                text="Total Expense"
                currencySymbol={
                  financialSummary?.data?.totalExpense?.currency || "$"
                }
                totalBalance={financialSummary?.data?.totalExpense?.amount || 0}
                iconBgClass="bg-[#EBE8E8]"
                className="bg-[#F8F8F8]"
                totalBalanceClass="text-dark-1"
              />
              <BalanceCard
                icon={WalletPlus}
                iconColor="#363A3F"
                text="Total Savings"
                currencySymbol={
                  financialSummary?.data?.totalSavings?.currency || "$"
                }
                totalBalance={financialSummary?.data?.totalSavings?.amount || 0}
                iconBgClass="bg-[#EBE8E8]"
                className="bg-[#F8F8F8]"
                totalBalanceClass="text-dark-1"
              />
            </div>
            {/* Working Capital Chart */}
            <WorkingCapital workingCapital={workingCapital} />
            {/* Recent Transaction */}
            <RecentTransactions recentTransactions={recentTransactions} />
          </div>
          {/* Right Side */}
          <div className="w-full lg:w-90 shrink-0">
            {/* Wallet */}
            <div className="flex items-center justify-between mb-[15px]">
              <p className="text-dark-1 text-lg font-semibold">Wallet</p>
              <div>
                <svg
                  width="17"
                  height="4"
                  viewBox="0 0 17 4"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.83333 0C0.820417 0 0 0.820417 0 1.83333C0 2.84625 0.820417 3.66667 1.83333 3.66667C2.84625 3.66667 3.66667 2.84625 3.66667 1.83333C3.66667 0.820417 2.84625 0 1.83333 0ZM14.8333 0C13.8204 0 13 0.820417 13 1.83333C13 2.84625 13.8204 3.66667 14.8333 3.66667C15.8462 3.66667 16.6667 2.84625 16.6667 1.83333C16.6667 0.820417 15.8462 0 14.8333 0ZM8.33333 0C7.32042 0 6.5 0.820417 6.5 1.83333C6.5 2.84625 7.32042 3.66667 8.33333 3.66667C9.34625 3.66667 10.1667 2.84625 10.1667 1.83333C10.1667 0.820417 9.34625 0 8.33333 0Z"
                    fill="#929EAE"
                  />
                </svg>
              </div>
            </div>
            <div className="group w-full rounded-2xl ">
              <div className="w-full flex items-center flex-col justify-center">
                {wallet?.data?.cards?.map((card: WalletCard, index: number) => (
                  <div
                    key={card.id}
                    className={`${
                      index > 0 ? "-mt-13 relative z-20" : ""
                    } group-hover:mt-1! w-full sm:w-fit flex flex-col items-center  rounded-2xl transition-all duration-200`}
                  >
                    {card.isDefault ? (
                      <div className="w-full">
                        <PrimaryCard {...card} />
                      </div>
                    ) : (
                      <div className=" flex items-center w-full ">
                        <SecondaryCard
                          {...card}
                          className="group-hover:bg-gray-400"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            {/* Scheduled Transfers */}
            <ScheduledTransfers scheduledTransfers={scheduledTransfers} />
          </div>
        </div>
      </div>
    );
  }
}
