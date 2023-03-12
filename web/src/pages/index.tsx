import { Article, Main, Section } from '@/components/Layout';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Next Payload Blog</title>
      </Head>
      <Main>
        <Article>
          <Section>
            <h2>Welcome to your Next.js App</h2>
          </Section>
        </Article>
      </Main>
    </>
  );
}
