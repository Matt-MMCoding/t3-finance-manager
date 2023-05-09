import Link from "next/link";
import type { INavLinkProps } from "./types";
import { useRouter } from "next/router";

const NavLink = ({ href, target, onClick, children }: INavLinkProps) => {
  const router = useRouter();

  return (
    <Link
      href={href}
      target={target}
      onClick={onClick}
      className={`w-max transition-colors hover:text-gray-400 ${
        router.asPath === href ? "text-purple-500" : "text-white"
      }`}
    >
      {children}
    </Link>
  );
};

export default NavLink;
