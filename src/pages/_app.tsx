import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import MobilePage from '@/components/mobile-page';

export default function App({ Component, pageProps }: AppProps) {
  const [isMobileView, setIsMobileView] = useState<boolean | undefined>();
  const isMobile = useMediaQuery({ maxWidth: 768 });

  useEffect(() => {
    setIsMobileView(isMobile);
  }, [isMobile]);

  if (isMobileView && isMobileView !== undefined) {
    return (
      <>
        <Head>
          <title>Ooops :( - Barberque Apps</title>
        </Head>
        <MobilePage />
      </>
    );
  }

  if (isMobileView !== undefined && !isMobileView) {
    return (
      <>
        <Head>
          <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
        </Head>
        <Component {...pageProps} />
      </>
    );
  }
}
