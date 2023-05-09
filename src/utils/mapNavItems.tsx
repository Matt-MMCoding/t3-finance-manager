import { NavLink } from "~/components/UI/NavLink";
import { NAV_ITEMS } from "~/constants/Navigation";

export const mappedNavItems = Object.keys(NAV_ITEMS).map((itemKey) => {
  const { label, route } = NAV_ITEMS[itemKey as keyof typeof NAV_ITEMS];

  return (
    <li key={itemKey} className="sm:text-center">
      <NavLink href={route}>{label}</NavLink>
    </li>
  );
});
