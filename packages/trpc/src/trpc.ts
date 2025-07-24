import { initTRPC } from '@trpc/server';
import { type Context } from './context';

// inject context
const t = initTRPC.context<Context>().create();

export const { router, procedure: publicProcedure, middleware } = t;
