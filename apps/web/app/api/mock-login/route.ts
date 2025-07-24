import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    // 清除 cookie 实现“登出”
    const res = NextResponse.json({ status: 'Logged out' });
    res.cookies.set('user-id', '', { maxAge: 0 });
    return res;
  }

  const res = NextResponse.json({ status: 'Logged in', userId });
  res.cookies.set('user-id', userId, {
    path: '/',
    httpOnly: false, // mock，生产环境建议为 true
  });

  return res;
}
