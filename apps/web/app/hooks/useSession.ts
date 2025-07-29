import { trpc } from '@billwise/utils';

export function useSession() {
  const { data, isLoading, error, refetch } = trpc.me.getMe.useQuery(undefined, {
    retry: false,
    refetchOnWindowFocus: false,
  });

  const isAuthenticated = Boolean(data);

  return {
    user: data,
    isLoading,
    error,
    isAuthenticated,
    refetch,
  };
}
