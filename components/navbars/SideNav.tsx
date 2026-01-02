"use client";
import SideNavTab from "./SideNavTab";
import Dashboard from "../icons/Dashboard";
import Transactions from "../icons/Transactions";
import Invoices from "../icons/Invoices";
import OpenWallet from "../icons/OpenWallet";
import Settings from "../icons/Settings";
import Help from "../icons/Help";
import Logout from "../icons/Logout";
import Logo from "../Common/Logo";

export default function SideNav() {
  return (
    <div className="h-screen px-6 pt-8 w-62.5 min-h-0 max-h-screen overflow-y-auto flex flex-col bg-[#fafafa]">
      <Logo href="/dashboard" />
      <div className="h-full mb-24 flex flex-col items-start justify-between">
        <div className="flex flex-col items-start gap-0.5 w-full">
          <SideNavTab link="/dashboard" icon={Dashboard} text="Dashboard" />
          <SideNavTab
            link="/dashboard/transactions"
            icon={Transactions}
            text="Transactions"
          />
          <SideNavTab
            link="/dashboard/invoices"
            icon={Invoices}
            text="Invoices"
          />
          <SideNavTab
            link="/dashboard/wallets"
            icon={OpenWallet}
            text="My Wallets"
          />
          <SideNavTab
            link="/dashboard/settings"
            icon={Settings}
            text="Settings"
          />
        </div>
        <div className="w-full flex flex-col gap-0.5">
          <SideNavTab link="/dashboard/help" icon={Help} text="Help" />
          <SideNavTab link="/dashboard/logout" icon={Logout} text="Logout" />
        </div>
      </div>
    </div>
  );
}
