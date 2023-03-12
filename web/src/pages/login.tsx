import { FormLogin } from '@/components/FormLogin';
import { Article, Main, Section } from '@/components/Layout';
import Head from 'next/head';

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Login - Next Payload Blog</title>
      </Head>
      <Main type="full">
        <Article>
          <Section>
            <FormLogin />
          </Section>
        </Article>
      </Main>
    </>
  );
}
