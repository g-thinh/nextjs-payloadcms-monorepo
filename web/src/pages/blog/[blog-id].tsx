import { Article, Banner, Content, Main, Section } from '@/components/Layout';
import { getSinglePost } from '@/utils/api';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import useSWR from 'swr';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { params } = context;
  const id = params?.['blog-id'];

  if (!id || typeof id !== 'string') {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const post = await getSinglePost(id);

  if (!post) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      post,
    },
  };
}

export default function BlogPostPage({ post }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data } = useSWR([post.id], getSinglePost, { fallbackData: post });

  return (
    <>
      <Banner>
        <Section css={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <h2>{data?.title}</h2>
        </Section>
      </Banner>
      <Main>
        <Content>
          <Article>
            <Section>
              <h3>Lorem Ipsum</h3>
              <br />
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pretium nibh quam, nec pellentesque est
                tincidunt malesuada. Proin sed nibh id lacus elementum laoreet. Donec elementum nulla lobortis enim
                egestas porta. Sed interdum mi id tellus congue porttitor. Duis vel porta mauris. Nunc id auctor leo.
                Nulla bibendum neque a dui sollicitudin, nec volutpat ipsum tincidunt. Vestibulum maximus metus a justo
                lacinia, vel volutpat massa mollis. Nam pharetra leo diam, quis pulvinar orci accumsan eget. Aliquam
                lacinia leo sed velit auctor, vel dignissim arcu blandit. Curabitur sapien enim, tristique ac hendrerit
                vitae, ultricies et urna.
              </p>
            </Section>
          </Article>
        </Content>
      </Main>
    </>
  );
}
