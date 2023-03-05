import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Layout } from '@/components/Layout';
import { globalStyles } from '@/styles/stitches.config';
import type { AppProps } from 'next/app';
import { AuthProvider } from '@/contexts/AuthContext';

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Layout>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </Layout>
    </AuthProvider>
  );
}
