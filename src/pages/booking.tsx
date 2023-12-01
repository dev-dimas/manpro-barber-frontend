import Head from 'next/head';
import BookingQueue from '@/components/booking/booking-queue';
import BookingForm from '@/components/home/booking-form';
import { UserLayout } from '@/layout';

const Booking = () => {
  return (
    <UserLayout>
      <Head>
        <title>Booking - Barberque</title>
      </Head>

      {/* Content */}
      <div className="w-full">
        <BookingForm />
        <BookingQueue />
      </div>
    </UserLayout>
  );
};

export default Booking;
