import { Article, Banner, Main, Section } from '@/components/Layout';
import { styled } from '@/styles/stitches.config';
import { getPosts } from '@/utils/api';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import NextLink from 'next/link';
import useSWR from 'swr';

const PostLink = styled(NextLink, {
  listStyleType: 'circle',
});

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const posts = await getPosts();
  return {
    props: {
      posts,
    },
  };
}

export default function BlogPage(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data } = useSWR(['posts'], getPosts, { fallbackData: props.posts });

  return (
    <>
      <Head>
        <title>Blog - Next Web App</title>
      </Head>
      <Banner>
        <Section css={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <h2>Blog Posts</h2>
        </Section>
      </Banner>
      <Main>
        <Article>
          <Section>
            <h2 style={{ marginBottom: '1em' }}>List of Posts</h2>
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
