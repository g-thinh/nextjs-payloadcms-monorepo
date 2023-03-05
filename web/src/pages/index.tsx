import { FormLogin } from '@/components/FormLogin';
import { Article, Main, Section } from '@/components/Layout';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Next Web App</title>
      </Head>
      <Main>
        <Article>
          <Section>
            <h1>Welcome to your Next.js App</h1>
            <FormLogin />
          </Section>
        </Article>
      </Main>
    </>
  );
}
