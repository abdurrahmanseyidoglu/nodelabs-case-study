import CardWifi from "@/components/icons/CardWifi";
import CreditCardChip from "@/components/icons/CreditCardChip";
import Image from "next/image";

export default function BackFace() {
  return (
    <div className="border border-[#b6b6b4] p-[0.5px] backdrop-blur-md bg-[linear-gradient(114.49deg,rgba(255,255,255,0.4)_-41.08%,rgba(255,255,255,0.1)_104.09%)] rounded-2xl px-7.5 py-4.5 relative w-81">
      <div className="flex items-center justify-start gap-2 mb-7">
        <p className="text-gray-5">Fintech.</p>
        <div className="inline-block h-5 w-px self-stretch bg-gray-5"></div>
        <p className="text-gray-5 text-xs font-medium">Universal Bank</p>
      </div>
      <div className="absolute top-16.75 end-9.25 z-10">
        <CardWifi />
      </div>
      <div className="mb-8">
        <CreditCardChip width={30} height={24} />
      </div>
      <p className="text-dark-1 text-lg font-bold">85952548****</p>
      <div className="flex items-start justify-between w-full">
        <p className="font-semibold text-xs text-dark-2">09/25</p>
        <Image
          src="/VisaLogo.svg"
          alt={"Visa Card Logo"}
          width={32}
          height={21}
          className="-mt-2"
        />
      </div>
    </div>
  );
}
