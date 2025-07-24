import { publicProcedure } from './trpc';
import { authMiddleware } from './middleware';

export const protectedProcedure = publicProcedure.use(authMiddleware);
