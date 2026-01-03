import SideNav from "@/components/navbars/SideNav";
import UpperNav from "@/components/navbars/UpperNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <div className="h-full flex items-start justify-start gap-10 pe-10">
        <SideNav />
        <div className="flex flex-col w-full">
          <div className="py-7.5">
            <UpperNav />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
