/**
 * 提供请求时的上下文，比如用户信息、请求头等。
 */
import { type CreateNextContextOptions } from '@trpc/server/adapters/next';

function getCookieFromHeader(header: string, key: string): string | null {
  return (
    header
      .split(';')
      .map(c => c.trim())
      .find(c => c.startsWith(`${key}=`))
      ?.split('=')[1] ?? null
  );
}

export function createContext(opts: CreateNextContextOptions) {
  const cookie = opts.req.headers.get('cookie') ?? '';
  const userId = getCookieFromHeader(cookie, 'user-id');

  // mock
  return {
    userId: userId ?? null,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
