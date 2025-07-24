import { router } from '../trpc';
import { protectedProcedure } from '../protectedProcedure';

export const meRouter = router({
  get: protectedProcedure.query(({ ctx }) => {
    return {
      userId: ctx.userId,
      status: 'Logged in (mock)',
    };
  }),
});
