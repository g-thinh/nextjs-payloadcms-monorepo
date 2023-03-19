import { getMe } from '@/utils/api';
import type { User } from 'cms/src/payload-types';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import createContext from './createContext';

export type CreateUserDto = {
  name: User['name'];
  email: User['email'];
  password: User['password'];
};

interface AuthContext {
  user: User | null;
  isLoading: boolean;
  create: (newUser: CreateUserDto) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
}

type CreateResponse = { errors: Array<Error>; message: string; doc: Partial<User> };

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
      await mutate().then(() => router.push('/profile'));
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
      await mutate().then(() => router.push('/'));
    }
  };

  const create = async ({ name, email, password }: CreateUserDto) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const { errors, doc, message }: CreateResponse = await response.json();

    if (errors) {
      throw new Error(errors[0].message);
    }

    if (response.ok) {
      await login(email, password);
    }
  };

  return <CtxProvider value={{ user, isLoading, create, login, logout }}>{children}</CtxProvider>;
}
