import Head from 'next/head';
import { ReactNode } from 'react';

export default function TitlePage({ children }: { children: ReactNode }) {
  return (
    <Head>
      <title>{children}</title>
    </Head>
  );
}
