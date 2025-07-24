'use client';

import { trpc } from '@billwise/utils';

export default function TestPage() {
  const { data, isLoading, error } = trpc.test.hello.useQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
