console.log('Resolving @billwise/db ->', require.resolve('@billwise/db'));

import { prisma } from '../../db/src/index';

async function testConnection() {
  try {
    const ret = await prisma.$queryRaw`SELECT 1`;
    console.log('✅ Database connected:', ret);
  } catch (error) {
    console.error('❌ Failed to connect to database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
