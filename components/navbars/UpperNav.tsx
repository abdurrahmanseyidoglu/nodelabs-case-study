"use client";

import Image from "next/image";
import BellIcon from "../icons/BellIcon";
import SearchIcon from "../icons/SearchIcon";
import { Dropdown } from "primereact/dropdown";
import { useSession } from "next-auth/react";

const actionItems = [
  { label: "Action 1", value: "action1" },
  { label: "Action 2", value: "action2" },
];

export default function UpperNav() {
  const { data: session } = useSession();

  const handleActionClick = () => {
    console.log("clicked");
  };
  const valueTemplate = () => {
    return (
      <div className="flex items-center gap-2">
        <Image
          src={`${session?.user?.image || "/profile-sample.png"}`}
          alt="User"
          className="rounded-full"
          width={36}
          height={36}
        />

        <span>{session?.user?.name || session?.user.fullName || "User"}</span>
      </div>
    );
  };
  if (!session) {
    return (
      <div className="animate-pulse h-10 bg-gray-200 rounded-primary"></div>
    );
  } else {
    return (
      <div className="flex items-center justify-between w-full">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <div className="hidden md:flex items-center justify-end gap-11.25">
          <div className="w-10">
            <SearchIcon color="var(--color-dark-2)" />
          </div>
          <div className="w-10">
            <BellIcon color="var(--color-dark-2)" />
          </div>
          {session?.user && (
            <Dropdown
              value={null}
              onChange={handleActionClick}
              options={actionItems}
              optionLabel="label"
              valueTemplate={valueTemplate}
              placeholder="Actions"
              className="w-full md:w-14rem "
              pt={{
                root: {
                  className: "px-[16px] py-[6px] rounded-[100px] bg-[#FAFAFA]",
                },
                item: {
                  className:
                    "px-4 py-3 hover:bg-gray-100 cursor-pointer transition-colors bg-white",
                },
              }}
            />
          )}
        </div>
      </div>
    );
  }
}
