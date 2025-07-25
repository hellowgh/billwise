/**
 * 提供请求时的上下文，比如用户信息、请求头等。
 */
import { type NextRequest } from 'next/server';

// notation: @trpc/server/adapters/next 中的 CreateNextContextOptions 是专门为旧版 pages/api 设计的，不要用
function getCookieFromHeader(header: string, key: string): string | null {
  return (
    header
      .split(';')
      .map(c => c.trim())
      .find(c => c.startsWith(`${key}=`))
      ?.split('=')[1] ?? null
  );
}

export async function createContext({ req }: { req: NextRequest }) {
  const cookie = req.headers.get('cookie') ?? '';
  const userId = getCookieFromHeader(cookie, 'user-id');

  const resHeaders = new Headers();

  // mock
  return {
    userId: userId ?? null,
    resHeaders,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
