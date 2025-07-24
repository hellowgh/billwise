import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '@billwise/trpc';

export const trpc = createTRPCReact<AppRouter>();
