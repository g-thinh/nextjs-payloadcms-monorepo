import { Article, Banner, Main, Section } from '@/components/Layout';
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
            <h3>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit....</h3>
            <br />
            <p>
              Quis vulputate ante facilisis at. Morbi vel sapien nunc. Aliquam faucibus augue id quam consequat, ac
              eleifend mauris consequat. Morbi sit amet elit pharetra, sagittis tellus ac, sollicitudin mi. Vivamus
              ullamcorper placerat mi, sed tincidunt lectus vehicula ut. Nam nec orci tortor. Praesent vitae lorem ut
              odio hendrerit imperdiet. Donec vitae quam vitae erat pellentesque suscipit non non nulla. Maecenas varius
              velit vitae nibh pellentesque, sed finibus ante hendrerit. Maecenas a nisl vel tortor tristique interdum
              ultrices vel mauris. Vivamus euismod arcu odio, tincidunt tincidunt urna sagittis vel. Curabitur mattis
              maximus erat, vel maximus tortor dapibus quis. Nulla non vestibulum ipsum. Quisque libero nulla,
              sollicitudin quis dapibus in, lacinia in dolor. Aliquam commodo efficitur lacinia. Maecenas fringilla a
              leo id finibus. Nam vitae malesuada est. Praesent tristique eget erat vel aliquam. Quisque pharetra sed
              erat vel congue.
            </p>
            <br />
            <p>
              Aenean ac eleifend risus. Aliquam quam nulla, ultrices ac metus quis, volutpat porttitor mi. Fusce in
              turpis quis elit facilisis vestibulum. Nulla finibus ipsum vitae sapien luctus, dignissim tristique est
              porttitor. Proin a neque vitae est molestie aliquam.
            </p>
          </Section>
        </Article>
      </Main>
    </>
  );
}
