import { createTRPCRouter } from "~/server/api/trpc";
import { userDashboardRouter } from "./routers/userDashboard";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  userDashboard: userDashboardRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
