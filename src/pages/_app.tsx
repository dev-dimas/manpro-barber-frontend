import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css';
import 'react-datepicker/dist/react-datepicker.css';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useMediaQuery } from 'react-responsive';
import { ToastContainer } from 'react-toastify';
import MobilePage from '@/components/mobile-page';
import { montserrat } from '@/libs/font';
import { cn } from '@/libs/utils';

export default function App({ Component, pageProps }: AppProps) {
  const [isMobileView, setIsMobileView] = useState<boolean | undefined>();
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const queryClientRef = useRef<QueryClient | null>(null);

  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient({
      defaultOptions: {
        queries: { refetchOnWindowFocus: false },
      },
    });
  }

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
      <QueryClientProvider client={queryClientRef.current}>
        <Head>
          <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        </Head>
        <ToastContainer position="top-center" autoClose={3000} bodyClassName={cn(montserrat.variable, 'font-montserrat text-sm font-semiboldbold')} />
        <Component {...pageProps} />
      </QueryClientProvider>
    );
  }
}
