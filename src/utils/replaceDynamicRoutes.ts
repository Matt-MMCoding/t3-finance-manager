import type { UrlObject } from "url";
import { DynamicRouteKey, Routes } from "~/constants/Routes";

export const getUserDashboardLink = (userId: string): UrlObject => {
  return {
    pathname: Routes.Dashboard.replace(
      DynamicRouteKey.UserDashboard,
      encodeURIComponent(userId)
    ),
  };
};
