"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Nav = () => {
    const pathname = usePathname(); // Get the current route

    return (
        <nav className="flex gap-4 p-4 bg-gray-100">
            <Link href="/" className={pathname === "/" ? "active" : ""}> Home </Link>
            <Link href="/posts" className={pathname === "/posts" ? "active" : ""}> Posts </Link>
        </nav>
    );
};

export default Nav;
