import { useAuth } from '@/contexts/AuthContext';
import { styled } from '@/styles/stitches.config';
import { Url } from 'next/dist/shared/lib/router/router';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const LoadingContainer = styled('div', {
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

type AuthGuardProps = React.PropsWithChildren<{
  redirectUrl?: Url;
}>;

export function AuthGuard({ children, redirectUrl = '/' }: AuthGuardProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user && !isLoading) {
      router.push(redirectUrl);
    }
  }, []);

  if (isLoading) {
    return <LoadingContainer>...Loading</LoadingContainer>;
  }

  return <>{user && children}</>;
}
