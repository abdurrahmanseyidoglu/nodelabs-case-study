"use client";
import { SideNavProps } from "@/types/Navbar";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideNavTab(props: SideNavProps) {
  const pathname = usePathname();
  const IconComponent = props.icon;

  return (
    <Link
      href={props.link}
      className={`${
        pathname === props.link
          ? "bg-primary font-semibold hover:bg-primary"
          : "hover:bg-gray-100"
      } p-4 flex items-center justify-start rounded-lg gap-3 text-sm font-medium text-dark-2 w-full`}
    >
      <IconComponent
        color={`${
          pathname === props.link
            ? "var(--color-dark-1)"
            : "var(--color-dark-2)"
        }`}
      />
      <p
        className={`${
          pathname === props.link ? "text-dark-1" : "text-dark-3"
        } `}
      >
        {props.text}
      </p>
    </Link>
  );
}
