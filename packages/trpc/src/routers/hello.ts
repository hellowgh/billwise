import { publicProcedure, router } from '../trpc';

export const testRouter = router({
  hello: publicProcedure.query(({ ctx }) => {
    return `Hello ${ctx.userId}`;
  }),
});
