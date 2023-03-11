import { Article, Banner, Main, Section } from '@/components/Layout';
import { RichText } from '@/components/RichText';
import { styled } from '@/styles/stitches.config';
import { getBlogPage, getPosts } from '@/utils/api';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import NextLink from 'next/link';
import useSWR from 'swr';

const PostLink = styled(NextLink, {
  listStyleType: 'circle',
});

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { locale } = context;
  const posts = await getPosts({ locale });
  const blog = await getBlogPage({ locale });
  return {
    props: {
      posts,
      blog,
      locale,
    },
  };
}

export default function BlogPage({ posts, blog, locale }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data } = useSWR(['/posts', locale], async () => await getPosts({ locale }), { fallbackData: posts });

  return (
    <>
      <Head>
        <title>Blog - Next Web App</title>
      </Head>
      <Banner>
        <Section css={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <h2>{blog?.pageTitle}</h2>
          <RichText content={blog?.content} />
        </Section>
      </Banner>
      <Main>
        <Article>
          <Section>
            <ul style={{ listStyleType: 'circle', marginLeft: '1em' }}>
              {data?.docs.map((post) => {
                return (
                  <li key={post.id} style={{ listStyleType: '' }}>
                    <PostLink href={'blog/' + post.id}>{post.title}</PostLink>
                  </li>
                );
              })}
            </ul>
          </Section>
        </Article>
      </Main>
    </>
  );
}
