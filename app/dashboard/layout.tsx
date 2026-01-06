import MobileSideNav from "@/components/navbars/MobileSideNav";
import SideNav from "@/components/navbars/SideNav";
import UpperNav from "@/components/navbars/UpperNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen px-0 pb-10 md:pb-0 relative">
      <div className="h-full flex items-start justify-start  2xl:gap-10 2xl:pe-10">
        <div className="h-full flex items-start 2xl:pt-8 sticky top-0 left-0 bg-[#fafafa]">
          <SideNav />
        </div>

        <div className="flex flex-col w-full">
          <div className="py-4 px-4 flex items-center gap-5 sticky -top-px bg-white z-100">
            <MobileSideNav />
            <UpperNav />
          </div>
          <div className="px-4">{children}</div>
        </div>
      </div>
    </div>
  );
}
