export default interface BalanceCardProps {
  text: string;
  icon: React.ComponentType<{ color: string }>;
  totalBalance: number;
  totalBalanceClass?: string;
  currencySymbol: string;
  className?: string;
  iconColor?: string;
  iconBgClass?: string;
}
