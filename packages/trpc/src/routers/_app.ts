import { router } from '../trpc';
import { testRouter } from './hello';
import { meRouter } from './me';

export const appRouter = router({
  test: testRouter,
  me: meRouter,
});

export type AppRouter = typeof appRouter;
