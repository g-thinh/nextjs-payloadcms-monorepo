import { Article, Banner, Content, Main, Section } from '@/components/Layout';
import { RichText } from '@/components/RichText';
import { getSinglePost } from '@/utils/api';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import useSWR from 'swr';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const { params } = context;
    const id = params?.['blog-id'];

    if (!id || typeof id !== 'string') {
      return {
        notFound: true,
      };
    }

    const post = await getSinglePost(id);

    return {
      props: {
        post,
      },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
}

export default function BlogPostPage({ post }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data } = useSWR([post?.id], getSinglePost, { fallbackData: post });

  return (
    <>
      <Head>
        <title>{post?.title} - Next Web App</title>
      </Head>
      <Banner>
        <Section css={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <h2>{data?.title}</h2>
        </Section>
      </Banner>
      <Main>
        <Content>
          <Article>
            <Section>
              <RichText content={data?.content} />
            </Section>
          </Article>
        </Content>
      </Main>
    </>
  );
}
