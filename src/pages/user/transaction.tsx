import Head from 'next/head';
import LoggedUserLayout from '@/layout/logged-user-layout';

export default function Transaction() {
  return (
    <>
      <Head>
        <title>Transaction History - Barberqueue</title>
      </Head>
      <LoggedUserLayout>
        <p>This is user transaction history. This page is under constructing</p>
      </LoggedUserLayout>
    </>
  );
}
