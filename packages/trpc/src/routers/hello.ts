import { protectedProcedure } from './../protectedProcedure';
import { router } from '../trpc';

export const testRouter = router({
  hello: protectedProcedure.query(({ ctx }) => {
    return `Hello ${ctx.userId}`;
  }),
});
