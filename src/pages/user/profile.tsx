import Head from 'next/head';
import LoggedUserLayout from '@/layout/logged-user-layout';

export default function Profile() {
  return (
    <>
      <Head>
        <title>Profile - Barberqueue</title>
      </Head>
      <LoggedUserLayout>
        <p>This is user profile. This page is under constructing</p>
      </LoggedUserLayout>
    </>
  );
}
