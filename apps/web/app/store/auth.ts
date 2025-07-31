import { create } from 'zustand';

type User = {
  id: string;
  name: string;
};

interface AuthStore {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useAuth = create<AuthStore>(set => ({
  user: null,
  setUser: user => set({ user }),
  logout: () => set({ user: null }),
}));
