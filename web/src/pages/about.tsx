import { Article, Banner, Main, Section } from '@/components/Layout';
import { RichText } from '@/components/RichText';
import { getAboutPage } from '@/utils/api';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import useSWR from 'swr';

export async function getStaticProps(context: GetStaticPropsContext) {
  try {
    const { locale } = context;
    const about = await getAboutPage({ locale });

    return {
      props: {
        about,
        locale,
      },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
}

export default function AboutPage({ about, locale }: InferGetStaticPropsType<typeof getStaticProps>) {
  const { data } = useSWR(['/about', locale], async () => await getAboutPage({ locale }), {
    fallbackData: about,
  });

  return (
    <>
      <Head>
        <title>{data?.pageTitle} - Next Payload Blog</title>
      </Head>
      <Banner>
        <Section css={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <h2>{data?.pageTitle}</h2>
        </Section>
      </Banner>
      <Main type="full">
        <Article>
          <Section>
            <RichText content={data?.content} />
          </Section>
        </Article>
      </Main>
    </>
  );
}
