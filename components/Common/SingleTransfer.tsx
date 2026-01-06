import { ScheduledTransfer } from "@/types/ApiResponse";
import Image from "next/image";
import { format } from "date-fns";

export default function SingleTransfer(props: ScheduledTransfer) {
  const formattedDate = format(
    new Date(props.date),
    "MMMM dd, yyyy 'at' HH:mm"
  );
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center justify-start gap-4">
        <Image
          src={`${props.image || "/profile-sample.png"}`}
          width={33}
          height={33}
          alt="profile picture"
          className="rounded-2xl"
        />
        <div className="flex flex-col gap-1.75">
          <p className="text-sm font-semibold text-dark-1">{props.name}</p>
          <p className="font-medium text-sm text-dark-2">{formattedDate}</p>
        </div>
      </div>
      <p className="text-black font-semibold">
        {props.amount < 0
          ? "-" + props.currency + "" + Math.abs(props.amount)
          : props.currency + "" + props.amount}
      </p>
    </div>
  );
}
