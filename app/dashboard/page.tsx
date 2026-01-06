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
import HTMLCircle from "@/components/CustomChartElements/HTMLCircle";
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

  if (isLoading) {
    return (
      // Skeleton Loaders
      <div className="animate-pulse">
        <div className="flex items-center justify-start gap-6.25 flex-wrap grow">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-32 w-full lg:w-64 bg-gray-200 rounded-primary"
            ></div>
          ))}
        </div>

        <div className="w-full mt-7.5 px-6.25 py-3.75 border border-[#F5F5F5] rounded-primary">
          <div className="h-6 w-full lg:w-40 bg-gray-200 rounded mb-4"></div>
          <div className="h-64 bg-gray-100 rounded"></div>
        </div>

        <div className="mt-6 border border-[#F5F5F5] px-6.25 py-3.75 rounded-primary">
          <div className="h-6 w-full lg:w-48 bg-gray-200 rounded mb-4"></div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-gray-100 rounded mb-3"></div>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="">
        {!session?.user?.accessToken && (
          <div className="my-9">
            <h1 className="text-5xl text-lime-500 mb-5">
              Congrats! You have signed in with Google!
            </h1>
            <p className="text-2xl text-amber-500">
              You will not see Data because this is a demo, The backend OAuth
              token endpoint is not yet implemented.
            </p>
          </div>
        )}
        <div className="flex items-start justify-between gap-8.75  flex-wrap xl:flex-nowrap">
          {/* Left Side */}
          <div className="grow min-w-0">
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
              <p className="font-semibold text-dark-1 text-lg text-center mb-3 lg:mb-0 lg:text-start lg:-mb-7">
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
                      data: workingCapital.data.data.map(
                        (item) => item.expense
                      ),
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
            mt-6 border border-[#F5F5F5] rounded-primary w-full"
            >
              <div className="flex items-center justify-between px-6.25 pt-3.75">
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
              <div className="overflow-x-auto px-6.25 pb-3.75">
                <div className="min-w-165 overflow-x-hidden">
                  <div className="flex items-center justify-between mb-5">
                    <p className="font-semibold text-xs text-dark-2 w-50">
                      NAME/BUSINESS
                    </p>
                    <p className="font-semibold text-xs text-dark-2 w-30">
                      TYPE
                    </p>
                    <p className="font-semibold text-xs text-dark-2 w-30">
                      AMOUNT
                    </p>
                    <p className="font-semibold text-xs text-dark-2 w-25">
                      DATE
                    </p>
                  </div>
                  {recentTransactions?.data.transactions.map(
                    (singleTransaction, index) => (
                      <div key={singleTransaction.id}>
                        <SingleTransactionItem {...singleTransaction} />
                        {index !==
                          recentTransactions?.data.transactions.length - 1 && (
                          <div className="w-full h-px bg-[#F5F5F5] mb-2"></div>
                        )}
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* Right Side */}
          <div className="w-full lg:w-90 shrink-0">
            {/* Wallet */}
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
}
