import { getMe } from '@/utils/api';
import type { User } from 'cms/src/payload-types';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import createContext from './createContext';

interface AuthContext {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
}

type LoginResponse = { errors: Array<Error>; user: User | null };
type LogoutResponse = { errors: Array<Error>; message: string };

export const [useAuth, CtxProvider] = createContext<AuthContext>();

export function AuthProvider({ children }: React.PropsWithChildren<{}>) {
  const router = useRouter();
  const { data: user, isLoading, mutate } = useSWR(['/profile'], async () => await getMe());

  const login = async (email: string, password: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
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
      mutate();
      router.push('/profile');
    }
  };

  const logout = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/logout`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const { errors, message }: LogoutResponse = await response.json();

    if (errors) {
      throw new Error(errors[0].message);
    }

    if (response.ok) {
      mutate();
      router.push('/');
    }
  };

  return <CtxProvider value={{ user, isLoading, login, logout }}>{children}</CtxProvider>;
}
