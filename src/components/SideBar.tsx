"use client";

import { useUser } from "@clerk/nextjs";
import { useUserStore } from "@/store/user";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import LinkIcon from "./icons/LinkIcon";
import AnalyticsIcon from "./icons/AnalyticsIcon";
import { SignedIn, UserButton } from "@clerk/nextjs";

function SideBar() {
  const { setUsername, username } = useUserStore();
  const pathname = usePathname();
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      setUsername(user.username);
    }
  }, [user]);

  return (
    <section className="max-w-200px">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-black text-2xl font-bold">Brand</h1>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
      <div className="flex flex-col items-start gap-3">
        <div className="flex gap-4 items-center">
          <div className="bg-[#D9D9D9] rounded-full h-12 w-12 "></div>
          <div className="flex flex-col">
            <p className="text-black">{username}</p>
            <p className="text-[#989898]">Free</p>
          </div>
        </div>
        <Link
          href="/links"
          className={`w-[200px] px-3 py-2 rounded-md font-bold flex items-center gap-2 transition-all duration-300 ease-in-out ${
            pathname.startsWith("/links")
              ? "bg-[#2563EB] bg-opacity-10 text-[#2563EB]"
              : "text-black hover:text-[#2563EB] hover:bg-[#2563EB]/10"
          }`}
        >
          <LinkIcon
            width="24"
            height="24"
            color={pathname.startsWith("/links") ? "#2563EB" : "#000"}
          />
          Links
        </Link>
        <Link
          href="/analytics"
          className={`w-[200px] px-3 py-2 rounded-md font-bold flex items-center gap-2 transition-all duration-300 ease-in-out ${
            pathname.startsWith("/analytics")
              ? "bg-[#2563EB] bg-opacity-10 text-[#2563EB]"
              : "text-black hover:text-[#2563EB] hover:bg-[#2563EB]/10"
          }`}
        >
          <AnalyticsIcon
            width="24"
            height="24"
            color={pathname.startsWith("/analytics") ? "#2563EB" : "#000"}
          />
          Analytics
        </Link>
      </div>
    </section>
  );
}

export default SideBar;
