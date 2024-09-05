"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-400 p-6 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">TodoApp</div>
        <div className="flex space-x-6">
          <Link href="/" className={`text-white px-4 py-2 rounded-lg ${pathname === "/" ? "bg-blue-700" : ""}`}>
            All
          </Link>
          <Link
            href="/active"
            className={`text-white px-4 py-2 rounded-lg ${pathname === "/active" ? "bg-blue-700" : ""}`}
          >
            Active
          </Link>
          <Link
            href="/completed"
            className={`text-white px-4 py-2 rounded-lg ${pathname === "/completed" ? "bg-blue-700" : ""}`}
          >
            Completed
          </Link>
        </div>
      </div>
    </nav>
  );
}
