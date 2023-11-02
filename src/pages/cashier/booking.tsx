import Head from 'next/head';
import { CashierLayout } from '@/layout';

const Booking = () => {
  return (
    <>
      <Head>
        <title>Booking - Cutboss Barbershop</title>
      </Head>

      <CashierLayout>
        <h1>Cashier Booking Page</h1>
      </CashierLayout>
    </>
  );
};

export default Booking;
