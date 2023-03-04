import { styled } from '@/styles/stitches.config';

const CONTENT_WIDTH = 'min(80ch,100%)';

export const Layout = styled('div', {
  position: 'relative',
  display: 'grid',
  gridTemplateColumns: `1fr ${CONTENT_WIDTH} 1fr`,
  gridTemplateRows: 'auto 1fr auto',
  gridColumnGap: 0,
  gridRowGap: 0,
  minHeight: '100vh',
});

export const Main = styled('main', {
  gridArea: '2 / 1 / 3 / 4',
  width: '100%',
});

export const Article = styled('article', {
  maxWidth: CONTENT_WIDTH,
  margin: '0 auto',
  variants: {
    type: {
      full: {
        maxWidth: '100%',
      },
    },
  },
});

export const Section = styled('section', {
  padding: '$4',
  maxWidth: CONTENT_WIDTH,
  margin: '0 auto',
  width: '100%',
});

export const Aside = styled('aside', {
  alignSelf: 'baseline',
  position: 'sticky',
  top: '8em',
  gridArea: '2 / 3 / 3 / 4',
});

export const Navigation = styled('nav', {
  gridArea: '2 / 1 / 3 / 2',
});
