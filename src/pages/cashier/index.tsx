import Head from 'next/head';
import { CashierLayout } from '@/layout';

const Cashier = () => {
  return (
    <>
      <Head>
        <title>Dashboard - Cutboss Barbershop</title>
      </Head>

      <CashierLayout>
        <h1>Cashier Dashboard Page</h1>
      </CashierLayout>
    </>
  );
};

export default Cashier;
