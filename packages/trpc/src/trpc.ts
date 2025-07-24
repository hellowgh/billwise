import { initTRPC } from '@trpc/server';
import { TRPCContext } from './context';

const t = initTRPC.context<TRPCContext>().create();

export const { router, procedure: publicProcedure, middleware } = t;
