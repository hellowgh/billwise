import { TRPCError } from '@trpc/server';
import { middleware } from './trpc';

export const authMiddleware = middleware(async ({ ctx, next }) => {
  if (!ctx.userId) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'You must be logged in',
    });
  }

  return next({
    ctx: {
      userId: ctx.userId, // 显式暴露给后续中间件
    },
  });
});
