import { Article, Main, Section } from '@/components/Layout';
import { User } from 'cms/src/payload-types';
import { getCookie } from 'cookies-next';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import useSWR from 'swr';
import { getMe } from '@/utils/api';

export async function getServerSideProps({ req, res, locale }: GetServerSidePropsContext) {
  try {
    const payloadToken = getCookie('payload-token', { req, res });

    if (!payloadToken) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    const user = await getMe(payloadToken.toString());

    return {
      props: {
        user,
        ...(await serverSideTranslations(locale, ['common'])),
      },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
}

export default function ProfilePage({ user }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data } = useSWR(['/profile', user.id], async () => await getMe(), { fallbackData: user });
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
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </Section>
        </Article>
      </Main>
    </>
  );
}
