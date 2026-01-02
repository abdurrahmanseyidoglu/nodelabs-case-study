import ButtonProps from "@/types/ButtonProps";
import Image from "next/image";

export default function Button(props: ButtonProps) {
  return (
    <>
      <button
        onClick={props.onClick}
        disabled={props.isDisabled || props.isLoading}
        className={`w-full py-3.5 
            ${
              props.variant === `primary`
                ? "bg-primary text-dark-1"
                : "border text-dark-3 border-gray-5 active:brightness-90 hover:bg-gray-100"
            }
         rounded-primary font-semibold hover:brightness-95 ease-in-out duration-150 hover:cursor-pointer active:brightness-90 mb-4`}
        type={props.type || "button"}
      >
        <div
          className={`${
            props.hasIcon && "flex items-center justify-center gap-2.5"
          }`}
        >
          {props.hasIcon && props.iconPath && (
            <Image
              src={props.iconPath}
              width={props.iconSize || 20}
              height={props.iconSize || 20}
              alt={props.iconAlt || "icon"}
            />
          )}
          <p> {props.isLoading ? "Loading ..." : props.text}</p>
        </div>
      </button>
    </>
  );
}
