import SideNavTab from "@/components/navbars/SideNavTab";

export default function Home() {
  return (
    <div className="">
      <main>Empty page</main>
      <div className="w-50">
        <SideNavTab
          link="/signin"
          iconPath="/DashboardIcon.svg"
          text="Dashboard"
        />
      </div>
    </div>
  );
}
