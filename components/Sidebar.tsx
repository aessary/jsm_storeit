"use client";
import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import {avatarPlaceholderUrl, navItems} from "@/constants";
import {usePathname} from "next/navigation";

interface Props {
    fullName: string;
    avatar: string;
    email: string;
}

const Sidebar = ({fullName, avatar, email}: Props) => {
    const pathname = usePathname();
  return (
    <aside className="sidebar">
      <Link href="/">
        <Image
          src="/assets/icons/logo-full-brand.svg"
          alt="logo"
          width={160}
          height={50}
          className="hidden h-auto lg:block"
        />
        <Image
          src="/assets/icons/logo-brand .svg"
          alt="logo"
          width={52}
          height={52}
          className="lg:hidden"
        />
      </Link>
      <nav className="sidebar-nav">
        <ul className="flex flex-1 flex-col gap-6">
            {navItems.map(({url, name, icon}) => (

                <Link key={name} href={url} className="lg:w-full">
                    <li className={cn("sidebar-nav-item", pathname === url && "shad-active")}>
                        <Image src={icon} alt={name} width={24} height={24} />
                        <p className="hidden lg:block">{name}</p>
                    </li>
                </Link>
            ))}
        </ul>
      </nav>
        <Image
        src="/assets/images/files-2.png"
        alt="logo"
        width={506}
        height={418}
        className="w-full"
        />
        <div className="sidebar-user-info">
            <Image
            src={avatar}
            alt="avatar"
            width={50}
            height={50}
            className="sidebar-user-avatar"
            />
            <div className="hidden lg:block">
                <p  className="subtitle-2 capitalise">{fullName}</p>
                <p className="caption">{email}</p>

            </div>
        </div>
    </aside>
  );
};
export default Sidebar;
