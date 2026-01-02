import CardWifi from "@/components/icons/CardWifi";
import CreditCardChip from "@/components/icons/CreditCardChip";
import Image from "next/image";

export default function FrontFace() {
  return (
    <div className="bg-[linear-gradient(104.3deg,#4A4A49_2.66%,#20201F_90.57%)] rounded-2xl px-7.5 py-4.5 relative w-86.25">
      <div className="flex items-center justify-start gap-2 mb-7">
        <p className="text-white">Fintech.</p>
        <div className="inline-block h-5 w-px self-stretch bg-[#626261]"></div>
        <p className="text-[#626260] text-xs font-medium">Universal Bank</p>
      </div>
      <div className="absolute top-16.75 end-9.25 z-10">
        <CardWifi />
      </div>
      <div className="mb-5.25">
        <CreditCardChip width={34} height={30} />
      </div>
      <p className="text-white text-lg font-bold">5495 7381 3759 2321</p>
      <div className="flex items-start justify-between w-full">
        <p className="font-semibold text-sm text-[#868685]">04/24</p>
        <Image
          src="/CreditCardLogo.svg"
          alt={"Credit Card Logo"}
          width={47}
          height={36}
        />
      </div>
    </div>
  );
}
