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
      className={`flex h-full w-full items-center gap-2 rounded-md p-4 leading-none transition-colors hover:bg-stone-900 ${
        router.asPath === href ? "bg-stone-900 font-bold" : "bg-transparent"
      }`}
    >
      {children}
    </Link>
  );
};

export default NavLink;
