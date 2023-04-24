import { useClerk, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useState } from "react";
import type { FC } from "react";
import { NavLink } from "../UI/NavLink";

import { CiMenuKebab, CiLogout } from "react-icons/ci";
import { AiOutlineHome, AiOutlineInfoCircle } from "react-icons/ai";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";

const MainNav: FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  const { user } = useUser();
  const { signOut } = useClerk();

  if (!user) return <div>404 - User not found.</div>;

  return (
    <aside
      className={`relative flex h-screen flex-col justify-between overflow-hidden bg-stone-800 p-8 transition-all ${
        isOpen ? "w-full" : "w-32"
      }`}
    >
      <button
        className="text-pink absolute right-2 top-2"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <CiMenuKebab
          size={24}
          className={`${!isOpen ? "rotate-90" : "rotate-0"}`}
        />
      </button>
      {/* User info / settings */}
      <div className="flex items-center">
        <Image
          src={user.profileImageUrl}
          alt="User profile image"
          width={46}
          height={46}
          className="rounded-full"
        />
        {isOpen && (
          <div className="ml-2 flex flex-col">
            <p className="font-bold">{user.fullName}</p>
            <p className="text-xs">{user.emailAddresses[0]?.emailAddress}</p>
          </div>
        )}
      </div>

      {/* Nav links */}
      <nav>
        <ul>
          <li>
            <NavLink href="/">
              <span>
                <AiOutlineHome size={isOpen ? 20 : 28} />
              </span>
              {isOpen && "Home"}
            </NavLink>
          </li>
          <li>
            <NavLink href={`/dashboard/${user.id}`}>
              <span>
                <MdOutlineAccountBalanceWallet size={isOpen ? 20 : 28} />
              </span>
              {isOpen && "Dashboard"}
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Secondary Nav */}
      <ul>
        <li>
          <NavLink href="/help" target="_blank">
            <span>
              <AiOutlineInfoCircle size={isOpen ? 20 : 28} />
            </span>
            {isOpen && "Help Center"}
          </NavLink>
        </li>
        <li>
          <NavLink href="" onClick={() => void signOut()}>
            <span>
              <CiLogout size={isOpen ? 20 : 28} />
            </span>
            {isOpen && "Sign Out"}
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default MainNav;
