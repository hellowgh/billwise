import { z } from 'zod';
import { publicProcedure, router } from '../trpc';
import { prisma } from '@billwise/db';
import bcrypt from 'bcryptjs';
import { TRPCError } from '@trpc/server';

// verify user's email and password
const registerSchema = z.object({
  name: z.string().min(3),
  email: z.email(),
  password: z.string().min(6, 'pwd must be at least 6 characters long'),
});

export const authRouter = router({
  register: publicProcedure.input(registerSchema).mutation(async ({ input, ctx }) => {
    const { email, password, name } = input;

    // 查找数据库中是否已有相同 email 的用户
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'User already exists',
      });
    }

    // 加密用户密码
    const hashedPassword = await bcrypt.hash(password, 10);

    // 创建用户
    const user = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    });

    ctx.resHeaders.set('Set-Cookie', `user-id=${user.id}; Path=/; HttpOnly; SameSite=Lax`);

    // 返回注册成功的用户信息（不含密码）
    return {
      name: user.name,
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
        email: z.email(),
        password: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { email, password } = input;

      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'email or pwd is incorrect',
        });
      }

      const isValid = await bcrypt.compare(password, user.hashedPassword);

      if (!isValid) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'email or pwd is incorrect',
        });
      }

      const { id } = user;

      // set cookie
      ctx.resHeaders.set('Set-Cookie', `user-id=${id}; Path=/; HttpOnly`);
      ctx.userId = id;

      return {
        success: true,
        userId: id,
        name: user.name,
        id,
      };
    }),
});
