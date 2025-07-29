import { router } from '../trpc';
import { meRouter } from './me';
import { authRouter } from './auth';

export const appRouter = router({
  me: meRouter,
  auth: authRouter,
});

export type AppRouter = typeof appRouter;
