import { router } from '../trpc';
import { protectedProcedure } from '../protectedProcedure';

export const meRouter = router({
  me: protectedProcedure.query(async ({ ctx }) => {
    // mock
    return {
      id: ctx.userId,
      name: 'Mock User',
      email: 'mock@example.com',
    };
  }),
});
