"use client";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import React from "react";
import { ModeToggle } from "../mode-toggle";
import { Logo } from "@/components/logo";
import { AuthDialog } from "@/components/AuthDialog";

export const Navbar = () => {
  const [menuState, setMenuState] = React.useState(false);

  return (
    <header>
      <nav
        data-state={menuState && "active"}
        className="bg-background/50 fixed z-20 w-full border-b backdrop-blur-3xl"
      >
        <div className="mx-auto max-w-6xl px-6 transition-all duration-300">
          <div className="flex justify-between items-center py-3 lg:py-4">
            {/* Kiri: Logo */}
            <div className="flex items-center">
              <Link
                href="/"
                aria-label="home"
                className="flex items-center space-x-2"
              >
                <Logo />
              </Link>
            </div>

            {/* Kanan: Tombol Aksi + Hamburger */}
            <div className="flex justify-end items-center gap-4">
              {/* Desktop actions */}
              <div className="hidden lg:flex items-center gap-3">
                <AuthDialog mode="signin" />
                <AuthDialog mode="signup" />
                <ModeToggle />
              </div>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState ? "Close Menu" : "Open Menu"}
                className="p-2.5 lg:hidden"
              >
                <Menu className="in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                <X className="in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 scale-0 opacity-0 duration-200" />
              </button>
            </div>

            {/* Mobile Menu */}
            <div
              className={`${
                menuState ? "block" : "hidden"
              } bg-background lg:hidden col-span-3 mt-4 w-full rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 dark:shadow-none`}
            >
              <div className="flex flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0">
                <AuthDialog mode="signin" />
                <AuthDialog mode="signup" />
                <ModeToggle />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
