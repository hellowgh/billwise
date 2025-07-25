'use client';

import { trpc } from '@billwise/utils';
import { useEffect, useState } from 'react';

export default function Page() {
  const { data, refetch } = trpc.user.me.useQuery();

  useEffect(() => {
    if (data) {
      console.log('User info:', data);
    }
  }, [data]);

  const utils = trpc.useUtils();
  const loginMutation = trpc.auth.login.useMutation({
    onSuccess() {
      utils.user.me.invalidate();
    },
  });

  const [status, setStatus] = useState('');

  const login = async () => {
    const res = await fetch('/api/mock-login?userId=abc123', {
      credentials: 'include',
    });
    const json = await res.json();
    setStatus(json.status);
    await refetch();
  };

  const [name, setName] = useState('');

  return (
    <div>
      <h2>User: {data?.name ?? 'Not Logged In'}</h2>
      <h2>name: {name}</h2>
      <input
        onChange={e => setName(e.target.value)}
        value={name}
        placeholder="Enter name"
        className="border p-2"
      />
      <button
        onClick={() => loginMutation.mutate({ name })}
        className="ml-2 px-4 py-2 bg-blue-500 text-white"
      >
        Login
      </button>
    </div>
  );
}
