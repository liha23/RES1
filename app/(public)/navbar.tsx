"use client";

import { GraduationCap } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-background/50 border-b border-border">
      <div className="px-4 lg:px-6">
        <div className="flex items-center justify-center h-16">
          {/* Logo */}
          <Link
            href="/result"
            className="flex items-center cursor-pointer hover:opacity-90 transition-all duration-300 group whitespace-nowrap"
          >
            <GraduationCap className="me-[5px] h-5 w-5 text-primary" />
            <span className="text-xl font-bold bg-linear-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent group-hover:from-primary group-hover:to-primary-dark transition-all duration-300">
              IPU Grade Portal
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
