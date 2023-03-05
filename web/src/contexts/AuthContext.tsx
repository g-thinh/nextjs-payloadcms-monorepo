import type { User } from 'cms/src/payload-types';
import { useRouter } from 'next/router';
import { useState } from 'react';
import createContext from './createContext';

interface AuthContext {
  user: User | null;
  login: (email: string, password: string) => void;
}

type LoginResponse = { errors: any; user: User | null };

export const [useAuth, CtxProvider] = createContext<AuthContext>();

export function AuthProvider({ children }: React.PropsWithChildren<{}>) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const { user, errors }: LoginResponse = await response.json();

    if (errors) {
      throw new Error(errors[0].message);
    }

    if (response.ok) {
      setUser(user);
      router.push('/profile');
    }
  };

  return <CtxProvider value={{ user, login }}>{children}</CtxProvider>;
}
