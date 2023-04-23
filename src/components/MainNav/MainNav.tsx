import { useClerk, useUser } from "@clerk/nextjs";
import Image from "next/image";
import type { FC } from "react";
import { NavLink } from "../UI/NavLink";

const MainNav: FC = () => {
  const { user } = useUser();
  const { signOut } = useClerk();

  if (!user) return <div>404 - User not found.</div>;

  return (
    <aside className="flex h-screen flex-col justify-between overflow-hidden bg-stone-800 p-8">
      {/* User info / settings */}
      <div className="flex items-center">
        <Image
          src={user.profileImageUrl}
          alt="User profile image"
          width={46}
          height={46}
          className="rounded-full"
        />
        <div className="ml-2 flex flex-col">
          <p className="font-bold">{user.fullName}</p>
          <p className="text-xs">{user.emailAddresses[0]?.emailAddress}</p>
        </div>
      </div>

      {/* Nav links */}
      <nav>
        <ul>
          <li>
            <NavLink href="/">Home</NavLink>
          </li>
          <li>
            <NavLink href="/payment">Payment</NavLink>
          </li>
        </ul>
      </nav>

      {/* Secondary Nav */}
      <ul>
        <li>
          <NavLink href="/help" target="_blank">
            Help Center
          </NavLink>
        </li>
        <li>
          <NavLink href="" onClick={() => void signOut()}>
            Sign Out
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default MainNav;
