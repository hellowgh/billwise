import { publicProcedure, router } from '../trpc';

export const testRouter = router({
  hello: publicProcedure.query(() => {
    return { message: 'hello trpc' };
  }),
});
