import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter, createContext } from '@billwise/trpc';
import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

const hanlde = async (req: NextRequest) => {
  const ctx = await createContext({ req });

  const response = await fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => ctx,
  });

  // ✅ 添加 Set-Cookie 等响应头
  for (const [key, value] of ctx.resHeaders.entries()) {
    response.headers.set(key, value);
  }

  return response;
};

export { hanlde as GET, hanlde as POST };
