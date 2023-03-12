import { Article, Main, Section } from '@/components/Layout';
import { User } from 'cms/src/payload-types';
import { getCookie } from 'cookies-next';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req, res } = context;
  const payloadToken = getCookie('payload-token', { req, res });
  const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/me`, {
    credentials: 'include',
    headers: {
      Authorization: `JWT ${payloadToken}`,
    },
  });

  const { user }: { user: User | null } = await response.json();

  if (!user) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  if (response.ok) {
    return {
      props: {
        user,
      },
    };
  }
}

export default function ProfilePage(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        <title>Profile - Next Payload Blog</title>
      </Head>
      <Main>
        <Article>
          <Section>
            <h2>My Profile</h2>
            <pre>{JSON.stringify(props.user, null, 2)}</pre>
          </Section>
        </Article>
      </Main>
    </>
  );
}
