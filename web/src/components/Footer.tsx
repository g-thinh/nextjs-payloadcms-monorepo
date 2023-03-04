import { styled } from '@/styles/stitches.config';
import { Article } from './Layout';

export const Container = styled('footer', {
  gridArea: '3 / 1 / 4 / 4',
});

export function Footer() {
  return (
    <Container>
      <Article>Footer</Article>
    </Container>
  );
}
