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
import Link from "next/link";
import SingleTransfer from "@/components/Common/SingleTransfer";
import { LineChart } from "@mui/x-charts/LineChart";
import HTMLCircle from "@/components/CustomChartelements/HTMLCircle";
import SingleTransactionItem from "@/components/Common/SingleTransactionItem";

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
      if (session?.accessToken) {
        try {
          const [
            walletData,
            summaryData,
            transfersData,
            workingCapitalData,
            recentTransactionsData,
          ] = await Promise.all([
            _getWallet(session.accessToken),
            _getFinancialSummary(session.accessToken),
            _getScheduledTransfers(session.accessToken),
            _getWorkingCapital(session.accessToken),
            _getRecentTransactions(session.accessToken, 3),
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
  }, [session]);

  const balanceCards = [
    {
      icon: ClosedWallet,
      iconColor: "var(--color-primary)",
      text: "Total balance",
      amount: financialSummary?.data?.totalBalance?.amount || 0,
      currency: financialSummary?.data?.totalBalance?.currency || "$",
      iconBgClass: "bg-[#4E5257]",
      className: "bg-[#363A3F]",
      totalBalanceClass: "text-white",
    },
    {
      icon: ClosedWallet,
      iconColor: "#363A3F",
      text: "Total Expense",
      amount: financialSummary?.data?.totalExpense?.amount || 0,
      currency: financialSummary?.data?.totalExpense?.currency || "$",
      iconBgClass: "bg-[#EBE8E8]",
      className: "bg-[#F8F8F8]",
      totalBalanceClass: "text-dark-1",
    },
    {
      icon: WalletPlus,
      iconColor: "#363A3F",
      text: "Total Savings",
      amount: financialSummary?.data?.totalSavings?.amount || 0,
      currency: financialSummary?.data?.totalSavings?.currency || "$",
      iconBgClass: "bg-[#EBE8E8]",
      className: "bg-[#F8F8F8]",
      totalBalanceClass: "text-dark-1",
    },
  ];

  return (
   
    <div className="">
      <div className="flex items-start justify-start gap-8.75 overflow-x-hidden">
        {/* Left Side */}
        <div>
          {/* Balance Cards */}
          <div className="flex items-center justify-start gap-6.25 flex-wrap grow">
            {balanceCards.map((card, index) => (
              <BalanceCard
                key={index}
                icon={card.icon}
                iconColor={card.iconColor}
                text={card.text}
                currencySymbol={card.currency}
                totalBalance={card.amount}
                iconBgClass={card.iconBgClass}
                className={card.className}
                totalBalanceClass={card.totalBalanceClass}
              />
            ))}
          </div>

          {/* Working Capital Chart */}
          <div className="w-full mt-7.5 px-6.25 py-3.75 border border-[#F5F5F5] rounded-primary">
            <p className="font-semibold text-dark-1 text-lg -mb-7">
              Working Capital
            </p>
            {workingCapital?.data && (
              <LineChart
                // TODO:
                // 1- Create a custom ToolTip if ypu get time: https://mui.com/x/react-charts/tooltip/#using-a-custom-tooltip
                // 2- customize the rest of the chart components to match the Figma design
                // slots={{ tooltip: CustomItemTooltip }}
                height={250}
                series={[
                  {
                    data: workingCapital.data.data.map((item) => item.income),
                    label: "Income",
                    color: "#29A073",
                    labelMarkType: HTMLCircle,
                  },
                  {
                    data: workingCapital.data.data.map((item) => item.expense),
                    label: "Expense",
                    color: "var(--color-primary)",
                    labelMarkType: HTMLCircle,
                  },
                ]}
                xAxis={[
                  {
                    scaleType: "point",
                    data: workingCapital.data.data.map((item) => item.month),
                    disableLine: true,
                  },
                ]}
                yAxis={[
                  {
                    width: 50,
                    disableLine: true,
                    valueFormatter: (value: number) => {
                      return new Intl.NumberFormat("en", {
                        notation: "compact",
                        compactDisplay: "short",
                      }).format(value);
                    },
                  },
                ]}
                margin={{ left: 0, right: 20, top: 30 }}
              />
            )}
          </div>
          {/* Recent Transaction */}
          <div
            className="flex flex-col gap-5 
            mt-6 border border-[#F5F5F5]  px-6.25 py-3.75 rounded-primary "
          >
            <div className="flex items-center justify-between ">
              <p className="text-lg font-semibold text-dark-1">
                Recent Transactions
              </p>
              <Link
                href="#"
                className="flex items-center justify-end gap-1.5 text-[#29A073] font-semibold text-sm"
              >
                View All
                <svg
                  width="6"
                  height="9"
                  viewBox="0 0 6 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M-3.47178e-07 1.0575L3.435 4.5L-4.62248e-08 7.9425L1.0575 9L5.5575 4.5L1.0575 -4.62248e-08L-3.47178e-07 1.0575Z"
                    fill="#29A073"
                  />
                </svg>
              </Link>
            </div>
            <div className="flex items-center justify-between mb-5 ">
              <p className="font-semibold text-xs text-dark-2 w-50">
                NAME/BUSINESS
              </p>
              <p className="font-semibold text-xs text-dark-2 w-30">TYPE</p>
              <p className="font-semibold text-xs text-dark-2 w-30">AMOUNT</p>
              <p className="font-semibold text-xs text-dark-2 w-25">DATE</p>
            </div>
            {recentTransactions?.data.transactions.map((singleTransaction) => (
              <SingleTransactionItem
                {...singleTransaction}
                key={singleTransaction.id}
              />
            ))}
          </div>
        </div>
        {/* Right Side */}
        <div className="w-90 shrink-0">
          {/* Wallet */}
          <div className="group w-fit rounded-2xl ">
            <div className="w-fit flex flex-col items-center">
              {wallet?.data?.cards?.map((card: WalletCard, index: number) => (
                <div
                  key={card.id}
                  className={`${
                    index > 0 ? "-mt-13 relative z-20" : ""
                  } group-hover:mt-1! group-hover:bg-gray-400 rounded-2xl transition-all duration-200`}
                >
                  {card.isDefault ? (
                    <PrimaryCard {...card} />
                  ) : (
                    <SecondaryCard {...card} />
                  )}
                </div>
              ))}
            </div>
          </div>
          {/* Scheduled Transfers */}
          <div className="mt-7.5">
            <div className="flex items-center justify-between mb-6.25">
              <p className="text-lg font-semibold text-dark-1">
                Scheduled Transfers
              </p>
              <Link
                href="#"
                className="flex items-center justify-end gap-1.5 text-[#29A073] font-semibold text-sm"
              >
                View All
                <svg
                  width="6"
                  height="9"
                  viewBox="0 0 6 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M-3.47178e-07 1.0575L3.435 4.5L-4.62248e-08 7.9425L1.0575 9L5.5575 4.5L1.0575 -4.62248e-08L-3.47178e-07 1.0575Z"
                    fill="#29A073"
                  />
                </svg>
              </Link>
            </div>
            <div className="flex flex-col gap-4 max-h-76.25 overflow-y-auto pe-3">
              {scheduledTransfers?.data?.transfers?.map((transfer) => (
                <SingleTransfer key={transfer.id} {...transfer} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
