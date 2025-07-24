/**
 * 提供请求时的上下文，比如用户信息、请求头等。
 */

export function createContext() {
  // mock
  return {
    userId: 'anonymous-user',
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
