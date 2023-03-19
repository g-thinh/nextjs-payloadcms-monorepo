import { FormLogin } from '@/components/FormLogin';
import { Article, Main, Section } from '@/components/Layout';
import { GetStaticPropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import Head from 'next/head';
import { FormSignup } from '@/components/FormSignup';

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

export default function SignupPage() {
  const { t } = useTranslation(['common']);

  return (
    <>
      <Head>
        <title>Login - {t('common:title')}</title>
      </Head>
      <Main type="full">
        <Article>
          <Section>
            <FormSignup />
          </Section>
        </Article>
      </Main>
    </>
  );
}
