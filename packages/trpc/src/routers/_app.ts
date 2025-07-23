import { router } from '../trpc';
import { testRouter } from './hello';

export const appRouter = router({
  test: testRouter,
});

export type AppRouter = typeof appRouter;
