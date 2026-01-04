import { Transaction } from "@/types/ApiResponse";
import Image from "next/image";
import { format } from "date-fns";

export default function SingleTransactionItem(props: Transaction) {
  const formattedDate = format(new Date(props.date), "dd MM yyyy");
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center justify-start gap-3.5 w-50">
        <div className="">
          <Image
            src={props.image}
            width={40}
            height={40}
            className="rounded-[5px]"
            alt="product image"
          />
        </div>
        <div className="flex flex-col gap-1.25">
          <p className="text-dark-1 text-sm font-medium">{props.name}</p>
          <p className="text-dark-2 text-xs">{props.business}</p>
        </div>
      </div>
      <p className="text-sm font-medium text-dark-2 w-30">{props.type}</p>
      <p className="text-sm font-semibold text-dark-1 w-30">
        {props.currency}
        {Math.abs(props.amount)}
      </p>
      <p className="text-sm font-medium text-dark-2 w-25">{formattedDate}</p>
    </div>
  );
}
