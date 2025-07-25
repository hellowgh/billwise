'use client';

import { trpc } from '@billwise/utils';
import { useEffect, useState } from 'react';

export default function Page() {
  const { data, refetch } = trpc.me.get.useQuery();

  useEffect(() => {
    if (data) {
      console.log('User info:', data);
    }
  }, [data]);

  const [status, setStatus] = useState('');

  const login = async () => {
    const res = await fetch('/api/mock-login?userId=abc123', {
      credentials: 'include',
    });
    const json = await res.json();
    setStatus(json.status);
    await refetch();
  };

  const logout = async () => {
    const res = await fetch('/api/mock-login');
    const json = await res.json();
    setStatus(json.setStatus);
    await refetch();
  };

  return (
    <div>
      <h1>Mock Auth Demo</h1>
      <p>Server userId: {data?.userId || 'Not logged in'}</p>
      <p>Client status: {status}</p>

      <button onClick={login}>Login</button>
      <div></div>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
