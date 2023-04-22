import { clerkClient } from "@clerk/nextjs/server";
import type { Payment } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";
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

  createPayment: privateProcedure
    .input(
      z.object({
        name: z.string().min(1).max(250),
        amount: z.number(),
        dueDate: z.date(),
        recurring: z.boolean(),
        recurringFrequency: z.string(),
        isIncoming: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.userId;

      const payment = await ctx.prisma.payment.create({
        data: {
          userId,
          name: input.name,
          amount: input.amount,
          dueDate: input.dueDate,
          recurring: input.recurring,
          recurringFrequency: input.recurringFrequency,
          isIncoming: input.isIncoming,
        },
      });
      return payment;
    }),
});
