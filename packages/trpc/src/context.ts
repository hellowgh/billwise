import { CreateNextContextOptions } from '@trpc/server/adapters/next';

export function createContext(opts: CreateNextContextOptions) {
  return {
    userId: 'mocked user',
  };
}

export type TRPCContext = Awaited<ReturnType<typeof createContext>>;
