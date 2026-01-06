"use client";
import { useState, useEffect } from "react";
import SideNavTab from "./SideNavTab";
import Dashboard from "../icons/Dashboard";
import Transactions from "../icons/Transactions";
import Invoices from "../icons/Invoices";
import OpenWallet from "../icons/OpenWallet";
import Settings from "../icons/Settings";
import Help from "../icons/Help";
import Logout from "../icons/Logout";
import Logo from "../Common/Logo";
import { logout } from "@/lib/authClient";

export default function MobileSideNav() {
  const [isOpen, setIsOpen] = useState(false);
  //   disable scroll when the navbar is open

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className=" top-4 left-4 z-40 p-2 2xl:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M20.75 7a.75.75 0 0 1-.75.75H4a.75.75 0 0 1 0-1.5h16a.75.75 0 0 1 .75.75m0 5a.75.75 0 0 1-.75.75H4a.75.75 0 0 1 0-1.5h16a.75.75 0 0 1 .75.75m0 5a.75.75 0 0 1-.75.75H4a.75.75 0 0 1 0-1.5h16a.75.75 0 0 1 .75.75"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-xs bg-blur z-40 2xl:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-screen w-65 bg-[#fafafa] z-40 transform transition-transform duration-300 2xl:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full px-6 pt-8 flex flex-col">
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
              <button
                onClick={() => logout()}
                className="hover:cursor-pointer flex items-center gap-3 p-4 rounded-lg text-dark-3 hover:bg-gray-100 w-full"
              >
                <Logout color={"var(--color-dark-2)"} />
                <span className="text-sm font-medium">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
