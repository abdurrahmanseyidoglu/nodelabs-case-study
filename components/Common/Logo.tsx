import Image from "next/image";
import Link from "next/link";

export default function Logo({ href }: { href: string }) {
  return (
    <Link href={href || "/"}>
      <Image
        src="/Logo.svg"
        alt="Logo"
        width={108}
        height={30}
        className="mb-10"
      />
    </Link>
  );
}
