"use client";
import React, { useState } from "react";
import { Home, User, Settings, Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import blackandwhite from "../../public/assets/icons/b&wicon.ico";

const SideNav = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={`h-screen bg-black text-white flex flex-col transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      } p-4`}
    >
      {/* Toggle Button */}
      <button
        onClick={toggleCollapse}
        className="flex items-center justify-between mb-6 p-2 rounded hover:bg-gray-700 transition"
      >
        {!isCollapsed && (
          <Image
            src={blackandwhite}
            alt="blackadnwhite"
            height={24}
            width={24}
          />
        )}
        {isCollapsed ? <Menu size={24} /> : <X size={24} />}
      </button>

      {/* Nav Items */}
      <nav className="flex flex-col gap-4">
        <NavItem
          href="/"
          icon={<Home size={24} />}
          label="Home"
          isCollapsed={isCollapsed}
        />
        <NavItem
          href="/profile"
          icon={<User size={24} />}
          label="Profile"
          isCollapsed={isCollapsed}
        />
        <NavItem
          href="/settings"
          icon={<Settings size={24} />}
          label="Settings"
          isCollapsed={isCollapsed}
        />
      </nav>
    </div>
  );
};

// Reusable NavItem Component
const NavItem = ({
  href,
  icon,
  label,
  isCollapsed,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  isCollapsed: boolean;
}) => {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition"
    >
      {icon}
      {!isCollapsed && <span className="text-white">{label}</span>}
    </Link>
  );
};

export default SideNav;
