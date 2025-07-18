import { prisma } from '@billwise/db';

async function seed() {
  console.log('Seeding database...');

  await prisma.user.create({
    data: {
      name: 'Admin',
      email: 'admin@billwise.com',
    },
  });

  console.log('Done.');
}

seed().catch(console.error);
