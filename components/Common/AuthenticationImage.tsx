import Image from "next/image";
export default function AuthenticationImage({
  imagePath,
}: {
  imagePath: string;
}) {
  return (
    <div className="relative w-[35%] h-full hidden md:block">
      <Image
        src={imagePath}
        alt="Authentication image"
        fill
        sizes={"100vh"}
        className="object-cover"
        loading="eager"
      />
    </div>
  );
}
