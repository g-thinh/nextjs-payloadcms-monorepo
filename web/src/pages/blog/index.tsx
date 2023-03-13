import { Article, Banner, Main, Section } from '@/components/Layout';
import { RichText } from '@/components/RichText';
import { styled } from '@/styles/stitches.config';
import { getBlogPage, getPosts } from '@/utils/api';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import NextLink from 'next/link';
import useSWR from 'swr';

const PostLink = styled(NextLink, {
  listStyleType: 'circle',
});

export async function getServerSideProps({ locale }: GetServerSidePropsContext) {
  try {
    const posts = await getPosts({ locale });
    const blog = await getBlogPage({ locale });
    return {
      props: {
        posts,
        blog,
        locale,
        ...(await serverSideTranslations(locale, ['common'])),
      },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
}

export default function BlogPage({ posts, blog, locale }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { t } = useTranslation(['common']);
  const { data } = useSWR(['/posts', locale], async () => await getPosts({ locale }), { fallbackData: posts });

  return (
    <>
      <Head>
        <title>
          {t('common:blog.title')} - {t('common:title')}
        </title>
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
