import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Layout } from '@/components/Layout';
import { globalStyles } from '@/styles/stitches.config';
import type { AppProps } from 'next/app';

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </Layout>
  );
}
