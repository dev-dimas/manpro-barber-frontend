import BookingQueue from '@/components/booking/booking-queue';
import BookingForm from '@/components/home/booking-form';
import TitlePage from '@/components/TitlePage';
import { UserLayout } from '@/layout';

const Booking = () => {
  return (
    <UserLayout>
      <TitlePage>Booking - Barberque</TitlePage>

      {/* Content */}
      <div className="w-full">
        <BookingForm />
        <BookingQueue />
      </div>
    </UserLayout>
  );
};

export default Booking;
