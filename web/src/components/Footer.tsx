import { styled } from '@/styles/stitches.config';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import NextLink from 'next/link';
import { Section } from './Layout';

const Container = styled('footer', {
  backgroundColor: 'hsl(0,0%,10%)',
  color: 'white',
  '@lg': {
    gridArea: '3 / 1 / 4 / 4',
  },
});

const Stack = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '$2',
  fontSize: '$sm',
});

const StyledLink = styled(NextLink, {
  display: 'flex',
  alignItems: 'center',
  gap: '$2',
  textDecoration: 'none',

  '&:hover': {
    textDecoration: 'underline',
  },

  '&:visited': {
    color: 'white',
  },
});

export function Footer() {
  return (
    <Container>
      <Section as="div">
        <Stack>
          <p>Next App</p>
          <div>Made with ❤️ by Gia Thinh Nguyen</div>
          <StyledLink href="/">
            <GitHubLogoIcon />
            <span>Github</span>
          </StyledLink>
        </Stack>
      </Section>
    </Container>
  );
}
