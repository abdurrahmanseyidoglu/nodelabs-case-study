import { RecentTransactionsResponse } from "@/types/ApiResponse";
import SingleTransactionItem from "../Common/SingleTransactionItem";
import Link from "next/link";

export default function RecentTransactions({
  recentTransactions,
}: {
  recentTransactions: RecentTransactionsResponse | null;
}) {
  return (
    <div className="flex flex-col gap-5 mt-6 border border-[#F5F5F5] rounded-primary w-full">
      <div className="flex items-center justify-between px-6.25 pt-3.75">
        <p className="text-lg font-semibold text-dark-1">Recent Transactions</p>
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
            <p className="font-semibold text-xs text-dark-2 w-30">TYPE</p>
            <p className="font-semibold text-xs text-dark-2 w-30">AMOUNT</p>
            <p className="font-semibold text-xs text-dark-2 w-25">DATE</p>
          </div>
          {recentTransactions?.data.transactions.map(
            (singleTransaction, index) => (
              <div key={singleTransaction.id}>
                <SingleTransactionItem {...singleTransaction} />
                {index !== recentTransactions?.data.transactions.length - 1 && (
                  <div className="w-full h-px bg-[#F5F5F5] mb-2"></div>
                )}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
