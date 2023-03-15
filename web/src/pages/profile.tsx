import { AuthGuard } from '@/components/AuthGuard';
import { Article, Main, Section } from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  try {
    return {
      props: {
        ...(await serverSideTranslations(locale, ['common'])),
      },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
}

export default function ProfilePage(_props: InferGetStaticPropsType<typeof getStaticProps>) {
  const { user } = useAuth();
  const { t } = useTranslation(['common']);

  return (
    <AuthGuard>
      <Head>
        <title>
          {t('common:profile.title')} - {t('common:title')}
        </title>
      </Head>
      <Main>
        <Article>
          <Section>
            <h2>{t('common:profile.my-user')}</h2>
            <pre>{JSON.stringify(user, null, 2)}</pre>
          </Section>
        </Article>
      </Main>
    </AuthGuard>
  );
}
