'use client';

import { useSession } from '@/hooks/useSession';
import { trpc } from '@billwise/utils';

export default function UserBar() {
  const { isLoading, refetch, isAuthenticated, user } = useSession();

  const logout = trpc.auth.logout.useMutation({
    onSuccess: () => refetch(),
  });

  if (isLoading) {
    return <div>loading</div>;
  }

  if (!isAuthenticated) {
    return <div>you are not login</div>;
  }

  return (
    <div className="flex items-center gap-4 p-4">
      <span>Hello, {user?.name}</span>
      <button onClick={() => logout.mutate()} className="bg-red-500 text-white px-3 py-1 rounded">
        Logout
      </button>
    </div>
  );
}
