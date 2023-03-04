import { styled } from '@/styles/stitches.config';
import NextLink from 'next/link';

export const Container = styled('header', {
  position: 'sticky',
  top: 0,
  height: '4em',
  gridArea: '1 / 1 / 2 / 4',
  display: 'flex',

  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 1rem',

  h1: {
    fontSize: '$2xl',
  },

  ul: {
    display: 'flex',
    gap: '$4',
  },
});

export function Header() {
  return (
    <Container>
      <h1>
        <NextLink href="/">My Website</NextLink>
      </h1>
      <nav>
        <ul>
          <li>
            <NextLink href="#">About</NextLink>
          </li>
          <li>
            <NextLink href="#">Blog</NextLink>
          </li>
        </ul>
      </nav>
    </Container>
  );
}
