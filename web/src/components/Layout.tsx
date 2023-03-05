import { styled } from '@/styles/stitches.config';

const CONTENT_WIDTH = 'min(80ch,100%)';

export const Layout = styled('div', {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',

  '@lg': {
    display: 'grid',
    gridColumnGap: 0,
    gridRowGap: 0,
    gridTemplateColumns: `1fr ${CONTENT_WIDTH} 1fr`,
    gridTemplateRows: 'auto 1fr auto',
  },
});

export const Main = styled('main', {
  flex: 1,
  width: '100%',
  '@lg': {
    gridArea: '2 / 1 / 3 / 4',
  },
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
  '@lg': {
    position: 'sticky',
    alignSelf: 'baseline',
    top: '2em',
    gridArea: '2 / 3 / 3 / 4',
  },
});

export const Navigation = styled('nav', {
  gridArea: '2 / 1 / 3 / 2',
});
