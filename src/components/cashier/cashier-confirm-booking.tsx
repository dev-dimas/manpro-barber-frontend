import dayjs from 'dayjs';
import { ChangeEvent, useState } from 'react';
import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { useGetCashierConfirmBooking, useUpdateBookingByCashier } from '@/hooks/query';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

type TBookingConfirm = {
  id: string;
  name: string;
  phone: string;
  date: string;
  startTime: string;
  endTime: string;
  barberman: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export default function CashierConfirmBooking() {
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>('');
  const { mutate: updateBooking, isLoading } = useUpdateBookingByCashier();
  const queryClient = useQueryClient();

  const { data: dataBooking } = useGetCashierConfirmBooking();

  const searchHandle = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const filteredDataBooking = dataBooking?.data?.filter((booking: TBookingConfirm) => {
    return booking.name.toLowerCase().includes(searchValue.toLowerCase());
  });

  const handleConfirm = (e: React.MouseEvent) => {
    e.preventDefault();
    updateBooking(selectedBooking, {
      onSuccess: (res: any) => {
        if (res.statusCode === '200') {
          toast.success('Berhasil menyelesaikan booking!');
        } else {
          toast.error('Gagal menyelesaikan booking!');
        }
      },
    });
    setIsConfirmDialogOpen(false);
    setSelectedBooking('');
    queryClient.invalidateQueries('get-cashier-confirm-booking');
  };

  return (
    <div className="mt-5">
      <span className="font-bold text-base text-black">Konfirmasi Booking</span>
      <div className="rounded-[10px] border border-black bg-#ECF4F3 mt-5 px-4 py-3">
        <Input
          type="text"
          placeholder="Search..."
          className="bg-white p-3 w-1/2 rounded-[5px] border border-#05312A"
          onChange={searchHandle}
          value={searchValue}
        />
        <div className="mt-6 flex flex-col gap-[10px]">
          {filteredDataBooking?.length ? (
            filteredDataBooking.map((booking: TBookingConfirm) => (
              <div className="flex flex-col gap-[10px]" key={booking.id}>
                <div className="flex justify-between items-center bg-white w-full text-#05312A py-2 pr-2 pl-9 rounded-[5px] border border-#05312A">
                  <div className="flex flex-col flex-1">
                    <span className="font-anton text-2xl">{booking.name}</span>
                    <span className="text-black font-medium">Bossman Haircut</span>
                  </div>
                  <span className="font-anton text-2xl w-2/7">
                    {dayjs(booking.date).format('DD-MM-YYYY')} - {booking.endTime.slice(0, 5)}
                  </span>
                  <div className="flex justify-end flex-1">
                    <Button
                      className="bg-#05312A hover:bg-#02221D py-4 px-3 w-[100px]"
                      onClick={() => {
                        setIsConfirmDialogOpen(true);
                        setSelectedBooking(booking.id);
                      }}
                    >
                      Konfirmasi
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">Tidak ada data booking yang perlu dikonfirmasi</p>
          )}
        </div>
      </div>
      <AlertDialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <AlertDialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
          <AlertDialogHeader>
            <AlertDialogTitle>Konfirmasi</AlertDialogTitle>
            <AlertDialogDescription>Kamu yakin ingin menyelesaikan pesanan ini?</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Batalkan</AlertDialogCancel>
            <AlertDialogAction className="bg-#05312A hover:bg-#02221D" disabled={isLoading} onClick={(e) => handleConfirm(e)}>
              {isLoading ? 'Loading...' : 'Iya'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
