import { authRouter } from './auth';
import { createTRPCRouter } from '../trpc';

export const appRouter = createTRPCRouter({
  auth: authRouter,
});
