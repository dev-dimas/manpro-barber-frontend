import CashierAddQueue from '@/components/cashier/cashier-add-queue';
import CashierBookingQueue from '@/components/cashier/cashier-booking-queue';
import CashierConfirmBooking from '@/components/cashier/cashier-confirm-booking';
import TitlePage from '@/components/TitlePage';
import { CashierLayout } from '@/layout';

const Cashier = () => {
  return (
    <CashierLayout>
      <TitlePage>Dashboard - Cutboss Barbershop</TitlePage>

      <CashierBookingQueue />

      <CashierAddQueue />

      <CashierConfirmBooking />
    </CashierLayout>
  );
};

export default Cashier;
