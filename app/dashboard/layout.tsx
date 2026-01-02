import SideNav from "@/components/navbars/SideNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <div className="h-full flex items-start justify-start gap-10">
        <SideNav />
        {children}
      </div>
    </div>
  );
}
