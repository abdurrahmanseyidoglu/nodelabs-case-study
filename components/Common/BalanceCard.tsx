import BalanceCardProps from "@/types/BalanceCardProps";

export default function BalanceCard(props: BalanceCardProps) {
  const IconComponent = props.icon;
  return (
    <div className={`px-5 py-6 rounded-primary w-55.5 ${props.className}`}>
      <div className="flex items-center justify-start gap-3.75">
        <div
          className={`p-3.25 rounded-full grow-0 shrink-0 w-10.5 h-10.5 ${
            props.iconBgClass || "bg-dark-2"
          }`}
        >
          <IconComponent color={props.iconColor || "#363A3F"} />
        </div>
        <div className="flex flex-col gap-2.5">
          <p className={`text-sm text-[#929EAE]`}>{props.text}</p>
          <div className={`flex items-center gap-0 ${props.totalBalanceClass}`}>
            <p className={`text-2xl font-bold `}>{props.currencySymbol}</p>
            <p className={` text-2xl font-bold `}>{props.totalBalance}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
