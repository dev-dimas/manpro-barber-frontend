import Head from 'next/head';
import LoggedUserLayout from '@/layout/logged-user-layout';

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Dashboard - Barberqueue</title>
      </Head>
      <LoggedUserLayout>
        <p>This is user dashboard. This page is under constructing</p>
      </LoggedUserLayout>
    </>
  );
}
