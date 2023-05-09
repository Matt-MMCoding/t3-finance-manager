import { useClerk, useUser } from "@clerk/nextjs";
import { useState } from "react";
import type { FC } from "react";
import { NavLink } from "../UI/NavLink";
import { Routes } from "~/constants/Routes";
import { mappedNavItems } from "~/utils/mapNavItems";
import { getUserDashboardLink } from "~/utils/replaceDynamicRoutes";
import Image from "next/image";

const MainNav: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useUser();
  const { signOut, openSignIn } = useClerk();

  return (
    <nav className="w-full bg-transparent p-4">
      <div className="relative flex w-full flex-wrap items-center md:mx-auto md:w-[1200px]">
        <div className="md:mr-auto">
          <NavLink href={Routes.Home}>Logo</NavLink>
        </div>
        <div className="ml-auto flex gap-8 md:order-2 md:ml-24">
          {user && (
            <div className="group flex items-center gap-2">
              <Image
                src={user.profileImageUrl}
                alt="User profile image"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span>{user.fullName}</span>
              <div className="absolute right-0 top-12 max-h-0 w-full overflow-hidden rounded-lg bg-slate-700 transition-all group-hover:max-h-96 group-hover:overflow-visible group-hover:border-2 group-hover:border-slate-600 md:w-max">
                <ul>
                  <li className="p-4">
                    <NavLink href={getUserDashboardLink(user.id)}>
                      Dashboard
                    </NavLink>
                  </li>
                  <li className="p-4">
                    <button onClick={() => void signOut()}>Logout</button>
                  </li>
                </ul>
              </div>
            </div>
          )}
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="ml-auto inline-flex items-center rounded-lg text-sm text-white md:hidden"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-6 w-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div className="w-full md:order-1 md:w-max">
          <ul
            className={`flex flex-1 flex-col transition-all md:max-h-min md:flex-row md:items-center md:justify-end md:gap-6 ${
              isOpen
                ? "max-h-96 rounded-lg bg-slate-700"
                : "max-h-0 overflow-hidden"
            }`}
          >
            {mappedNavItems}
            {!user && (
              <button
                onClick={() => void openSignIn()}
                className="text-white transition-colors hover:text-gray-400"
              >
                Login
              </button>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
