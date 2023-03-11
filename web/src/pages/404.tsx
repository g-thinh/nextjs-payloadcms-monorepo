import { Article, Main, Section, Banner } from '@/components/Layout';
import Head from 'next/head';

export default function NotFoundPage() {
  return (
    <>
      <Head>
        <title>Not Found | Next Web App</title>
      </Head>
      <Banner>
        <Article>
          <Section>
            <h2>404 Page Not Found</h2>
          </Section>
        </Article>
      </Banner>
      <Main />
    </>
  );
}
