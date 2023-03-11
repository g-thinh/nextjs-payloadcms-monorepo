import { useAuth } from '@/contexts/AuthContext';
import { styled } from '@/styles/stitches.config';
import NextLink from 'next/link';
import { Section } from './Layout';
import { SelectLocale } from './SelectLocale';

export const Container = styled('header', {
  position: 'sticky',
  top: 0,
  height: '4em',
  display: 'flex',
  backgroundColor: 'hsl(0,0%,15%)',
  color: 'white',

  h1: {
    fontSize: '$2xl',
    '> a': {
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
  },

  ul: {
    display: 'flex',
    gap: '$4',
    alignItems: 'center',
  },
});

const StyledLink = styled(NextLink, {
  color: 'white',
});

const Button = styled('button', {
  px: '$4',
  py: '$2',
  backgroundColor: 'hsl(1,0%, 100%)',
  color: 'black',
  border: '1px solid black',
  borderRadius: '$md',

  '&:hover': {
    cursor: 'pointer',
    backgroundColor: 'hsl(1,0%,80%)',
  },

  '&:active': {
    backgroundColor: 'hsl(1,0%,90%)',
  },
});

export function Header() {
  const { user, logout } = useAuth();
  return (
    <Container>
      <Section
        css={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 1rem',
        }}
      >
        <h1>
          <StyledLink href="/">Next Payload Blog</StyledLink>
        </h1>
        <nav>
          <ul>
            <li>
              <SelectLocale />
            </li>
            <li>
              <StyledLink href="/about">About</StyledLink>
            </li>
            <li>
              <StyledLink href="/blog">Blog</StyledLink>
            </li>

            {user ? (
              <li>
                <Button onClick={logout}>Logout</Button>
              </li>
            ) : (
              <li>
                <StyledLink href="/login">Login</StyledLink>
              </li>
            )}
          </ul>
        </nav>
      </Section>
    </Container>
  );
}
