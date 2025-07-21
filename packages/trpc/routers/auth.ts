import { z } from 'zod';
import { publicProcedure, createTRPCRouter } from '../trpc';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

// verify user's email and password
const registerSchema = z.object({
  email: z.email(),
  password: z.string().min(6, 'pwd must be at least 6 characters long'),
});

export const authRouter = createTRPCRouter({
  register: publicProcedure.input(registerSchema).mutation(async ({ input }) => {
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
    const user = await prisma.user.create({
      data: {
        email,
        hashedPassword,
      },
    });

    // 返回注册成功的用户信息（不含密码）
    return {
      id: user.id,
      email: user.email,
    };
  }),
});
