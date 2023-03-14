import { Article, Main, Section } from '@/components/Layout';
import { User } from 'cms/src/payload-types';
import { getCookie } from 'cookies-next';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';

export async function getServerSideProps({ req, res, locale }: GetServerSidePropsContext) {
  try {
    const payloadToken = getCookie('payload-token', { req, res });
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/me`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
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
          ...(await serverSideTranslations(locale, ['common'])),
        },
      };
    }
  } catch (e) {
    return {
      notFound: true,
    };
  }
}

export default function ProfilePage(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { t } = useTranslation(['common']);
  return (
    <>
      <Head>
        <title>
          {t('common:profile.title')} - {t('common:title')}
        </title>
      </Head>
      <Main>
        <Article>
          <Section>
            <h2>{t('common:profile.my-user')}</h2>
            <pre>{JSON.stringify(props.user, null, 2)}</pre>
          </Section>
        </Article>
      </Main>
    </>
  );
}
