import { Article, Main, Section } from '@/components/Layout';
import { GetStaticPropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
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

export default function Home() {
  const { t } = useTranslation(['common']);
  return (
    <>
      <Head>
        <title>{t('common:title')}</title>
      </Head>
      <Main>
        <Article>
          <Section>
            <h2>{t('common:welcome')}</h2>
            <p></p>
          </Section>
        </Article>
      </Main>
    </>
  );
}
