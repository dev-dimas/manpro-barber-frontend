import Head from 'next/head';
import { CashierLayout } from '@/layout';

const Recap = () => {
  return (
    <>
      <Head>
        <title>Rekap - Cutboss Barbershop</title>
      </Head>

      <CashierLayout>
        <h1>Cashier Recap Page</h1>
      </CashierLayout>
    </>
  );
};

export default Recap;
