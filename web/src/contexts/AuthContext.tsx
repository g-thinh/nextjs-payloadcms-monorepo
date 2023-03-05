import type { User } from 'cms/src/payload-types';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import createContext from './createContext';

interface AuthContext {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

type LoginResponse = { errors: Array<Error>; user: User | null };
type LogoutResponse = { errors: Array<Error>; message: string };

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

  const logout = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    const { errors, message }: LogoutResponse = await response.json();

    if (errors) {
      throw new Error(errors[0].message);
    }

    if (response.ok) {
      setUser(null);
      router.push('/');
    }
  };

  useEffect(() => {
    const fetchMe = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/me`, {
        credentials: 'include',
      });

      const { user }: { user: User | null } = await response.json();

      if (!user) {
        router.push('/');
      }

      if (response.ok) {
        setUser(user);
      }
    };

    fetchMe();
  }, []);

  return <CtxProvider value={{ user, login, logout }}>{children}</CtxProvider>;
}
