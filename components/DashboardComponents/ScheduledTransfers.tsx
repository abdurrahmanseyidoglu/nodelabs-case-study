import { ScheduledTransfersResponse } from "@/types/ApiResponse";
import Link from "next/link";
import SingleTransfer from "../Common/SingleTransfer";

export default function ScheduledTransfers({
  scheduledTransfers,
}: {
  scheduledTransfers: ScheduledTransfersResponse | null;
}) {
  return (
    <div className="mt-7.5">
      <div className="flex items-center justify-between mb-6.25">
        <p className="text-lg font-semibold text-dark-1">Scheduled Transfers</p>
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
  );
}
