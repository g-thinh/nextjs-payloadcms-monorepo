import { Article, Main, Section, Banner } from '@/components/Layout';

export default function NotFoundPage() {
  return (
    <>
      <Banner>
        <Article>
          <Section>
            <h2>404 Page Not Found</h2>
          </Section>
        </Article>
      </Banner>
      <Main />
    </>
  );
}
