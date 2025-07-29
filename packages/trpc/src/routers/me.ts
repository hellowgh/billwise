import { router } from '../trpc';
import { protectedProcedure } from '../protectedProcedure';
import { prisma } from '@billwise/db';
import { TRPCError } from '@trpc/server';

export const meRouter = router({
  getMe: protectedProcedure.query(async ({ ctx }) => {
    const user = await prisma.user.findUnique({
      where: {
        id: ctx.userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    if (!user) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'user not found',
      });
    }

    return user;
  }),
});
