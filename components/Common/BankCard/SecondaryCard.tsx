import CardWifi from "@/components/icons/CardWifi";
import CreditCardChip from "@/components/icons/CreditCardChip";
import { WalletCard } from "@/types/ApiResponse";
import Image from "next/image";

export default function SecondaryCard(
  props: WalletCard & { className?: string }
) {
  const firstName = props.bank.split("|")[0].trim();
  const lastName = props.bank.split("|")[1].trim();
  return (
    <div
      className={`border border-[#b6b6b4] p-[0.5px] backdrop-blur-md bg-[linear-gradient(114.49deg,rgba(255,255,255,0.4)_-41.08%,rgba(255,255,255,0.1)_104.09%)] rounded-2xl px-[20px] py-[15px] relative w-full mx-3 sm:mx-0 sm:w-[324px] transition-colors duration-200 ${
        props.className || ""
      }`}
    >
      <div className="flex items-center justify-start gap-2 mb-4">
        <p className="text-gray-5">{firstName}</p>
        <div className="inline-block h-5 w-px self-stretch bg-gray-5"></div>
        <p className="text-gray-5 text-xs font-medium">{lastName}</p>
      </div>
      <div className="absolute top-16.75 end-9.25 z-10">
        <CardWifi />
      </div>
      <div className="mb-8">
        <CreditCardChip width={30} height={24} />
      </div>
      <p className="text-dark-1 text-lg font-bold">{props.cardNumber}</p>
      <div className="flex items-start justify-between w-full">
        <p className="font-semibold text-xs text-dark-2">
          {props.expiryMonth}/{props.expiryYear}
        </p>
        <Image
          src={props.type === "visa" ? "/VisaLogo.svg" : "/CreditCardLogo.svg"}
          alt={"Visa Card Logo"}
          width={32}
          height={21}
          className="-mt-2"
        />
      </div>
    </div>
  );
}
