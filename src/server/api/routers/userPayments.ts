import { z } from "zod";
import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const userPaymentRouter = createTRPCRouter({
  getPaymentsByUserId: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const payments = await ctx.prisma.payment.findMany({
        where: { userId: input.userId },
        orderBy: [{ dueDate: "asc" }],
      });
      return payments;
    }),

  createPayment: privateProcedure
    .input(
      z.object({
        name: z.string().min(1).max(250),
        amount: z.number(),
        dueDate: z.string(),
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
