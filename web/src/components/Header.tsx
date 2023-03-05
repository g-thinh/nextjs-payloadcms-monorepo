import { styled } from '@/styles/stitches.config';
import NextLink from 'next/link';

export const Container = styled('header', {
  position: 'sticky',
  top: 0,
  height: '4em',
  gridArea: '1 / 1 / 2 / 4',
  display: 'flex',
  backgroundColor: 'hsl(0,0%,15%)',
  color: 'white',

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

const StyledLink = styled(NextLink, {
  color: 'white',
});

export function Header() {
  return (
    <Container>
      <h1>
        <StyledLink href="/">Next App</StyledLink>
      </h1>
      <nav>
        <ul>
          <li>
            <StyledLink href="#">About</StyledLink>
          </li>
          <li>
            <StyledLink href="#">Blog</StyledLink>
          </li>
        </ul>
      </nav>
    </Container>
  );
}
