import { Article, Banner, Main, Section } from '@/components/Layout';
import { RichText } from '@/components/RichText';
import { getAboutPage } from '@/utils/api';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import useSWR from 'swr';

export async function getStaticProps(_context: GetStaticPropsContext) {
  try {
    const about = await getAboutPage();

    return {
      props: {
        about,
      },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
}

export default function AboutPage({ about }: InferGetStaticPropsType<typeof getStaticProps>) {
  const { data } = useSWR([about?.id], getAboutPage, { fallbackData: about ?? undefined });
  return (
    <>
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
