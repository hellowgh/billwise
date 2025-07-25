import { router } from '../trpc';
import { testRouter } from './hello';
import { meRouter } from './me';
import { authRouter } from './auth';

export const appRouter = router({
  test: testRouter,
  user: meRouter,
  auth: authRouter,
});

export type AppRouter = typeof appRouter;
