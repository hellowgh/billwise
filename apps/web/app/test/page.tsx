'use client';

import { trpc } from '@billwise/utils';
import { useState } from 'react';

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const register = trpc.auth.register.useMutation();

  const doRegister = async (data: typeof form) => {
    try {
      const res = await register.mutateAsync(data);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl mb-2">Register</h1>

      <input
        placeholder="Name"
        className="border p-2 mb-2 block"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
      />
      <input
        placeholder="Email"
        className="border p-2 mb-2 block"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
      />
      <input
        placeholder="Password"
        type="password"
        className="border p-2 mb-2 block"
        value={form.password}
        onChange={e => setForm({ ...form, password: e.target.value })}
      />

      <button onClick={() => doRegister(form)} className="bg-blue-600 text-white px-4 py-2 rounded">
        Register
      </button>
    </div>
  );
}
