import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from '@billwise/trpc';
import { NextRequest } from 'next/server';

const handler = (req: NextRequest) => {
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => ({}), // 简化：无 auth
  });
};

export { handler as GET, handler as POST };
