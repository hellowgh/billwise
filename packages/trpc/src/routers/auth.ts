import { success, z } from 'zod';
import { publicProcedure, router } from '../trpc';
import { prisma } from '@billwise/db';
import bcrypt from 'bcryptjs';

// verify user's email and password
const registerSchema = z.object({
  email: z.email(),
  password: z.string().min(6, 'pwd must be at least 6 characters long'),
});

export const authRouter = router({
  register: publicProcedure.input(registerSchema).mutation(async ({ input, ctx }) => {
    const { email, password } = input;

    // 查找数据库中是否已有相同 email 的用户
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      throw new Error('User already exists');
    }

    // 加密用户密码
    const hashedPassword = await bcrypt.hash(password, 10);

    // 创建用户
    // const user = await prisma.user.create({
    //   data: {
    //     email,
    //     hashedPassword,
    //   },
    // });

    const user = {
      id: 'mock-user-id',
      email: input.email,
      name: 'Mock User',
    };

    ctx.resHeaders.set('Set-Cookie', `user-id=${user.id}; Path=/; HttpOnly; SameSite=Lax`);

    // 返回注册成功的用户信息（不含密码）
    return {
      id: user.id,
      email: user.email,
    };
  }),

  logout: publicProcedure.mutation(async ({ ctx }) => {
    ctx.resHeaders.set('Set-Cookie', 'user-id=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax');

    return {
      success: true,
    };
  }),

  login: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
      })
    )
    .mutation(({ ctx, input }) => {
      const userId = 'mock-user-123';

      // set cookie
      ctx.resHeaders.set('Set-Cookie', `user-id=${userId}; Path=/; HttpOnly`);

      return {
        success: true,
        userId,
        name: input.name,
      };
    }),
});
