import { clerkClient } from "@clerk/nextjs/server";
import type { Payment } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { filterUserForClient } from "~/server/utils/filterUserForClient";

const addUserDataToPayments = async (payments: Payment[]) => {
  const users = (
    await clerkClient.users.getUserList({
      userId: payments.map((payment) => payment.userId),
    })
  ).map(filterUserForClient);

  return payments.map((payment) => {
    const user = users.find((user) => user.id === payment.userId);

    if (!user || !user.id) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "User not found",
      });
    }
    return {
      payment,
      user: {
        ...user,
        userId: payment.userId,
      },
    };
  });
};

export const userPaymentRouter = createTRPCRouter({
  getPaymentsByUserId: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(({ ctx, input }) =>
      ctx.prisma.payment
        .findMany({
          where: { userId: input.userId },
          orderBy: [{ createdAt: "desc" }],
        })
        .then(addUserDataToPayments)
    ),
});
