export default interface ButtonProps {
    text?: string;
  variant: "primary" | "secondary";
  hasIcon?: boolean;
  iconPath?: string;
  iconSize?: number;
  isDisabled?: boolean;
  iconAlt?: string;
  isLoading?: boolean;
  type?: "submit" | "reset" | "button";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
