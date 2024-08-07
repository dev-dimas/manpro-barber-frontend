import { Separator } from '@radix-ui/react-select';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FaMinusCircle } from 'react-icons/fa';
import { PiMoneyLight } from 'react-icons/pi';
import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useCreateBookingByEmployee } from '@/hooks/query';
import useBill from '@/hooks/store/useBill';
import useEmployee from '@/hooks/store/useEmployee';

const SidebarBill = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const dateObj = new Date();
  const date = dateObj.getDate();
  const month = dateObj.toLocaleString('id', { month: 'long' });
  const year = dateObj.getFullYear();
  const bill = useBill((state) => state.bill);
  const employee = useEmployee((state) => state.employeeData);
  const clearBill = useBill((state) => state.clearBill);
  const undoBill = useBill((state) => state.undoBill);
  const { mutate: createBookingByEmployee } = useCreateBookingByEmployee();
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleCreateBooking = (e: React.MouseEvent) => {
    e.preventDefault();
    createBookingByEmployee(
      { ...bill, employeeId: employee?.id },
      {
        onSuccess: (data) => {
          if (data.statusCode === 409) {
            toast.error('Booking failed. Already full booked!');
          } else if (data.statusCode === 201) {
            toast.success('Booking successfully created!');
            clearBill();
            queryClient.invalidateQueries('get-cashier-confirm-booking');
          } else {
            toast.error('Something went wrong!');
          }
          setIsModalOpen(false);
        },
        onError: (error: any) => {
          toast.error(error.message);
        },
      }
    );
  };

  return (
    <>
      <div className="flex items-center gap-5 pb-3">
        <span className="text-sm text-#FFF000 font-semibold">{employee?.name}</span>
        <Avatar className="w-14 h-14">
          <AvatarImage src="/images/employee-1.jpg" />
          <AvatarFallback>CB</AvatarFallback>
        </Avatar>
      </div>

      {router.pathname === '/cashier' && (
        <div className="bg-#ECF4F3 rounded-lg w-full font-bold text-xs py-[10px] px-[18px]">
          <div className="flex justify-between">
            <p>Tagihan</p>
            <p>{`${date} ${month} ${year}`}</p>
          </div>
          <Separator className="h-[0.5px] bg-black mt-2" />
          <div className="min-h-[300px]">
            {bill && (
              <div className="mt-3 p-2 rounded-lg border border-black relative">
                <div className="flex justify-between">
                  <p className="text-lg font-bold leading-none">{bill.serviceName}</p>
                  <Button type="button" variant={'ghost'} className="w-fit h-fit p-0 m-0" onClick={() => undoBill()}>
                    <FaMinusCircle className="text-red-500" size={18} />
                  </Button>
                </div>
                <p className="font-normal">{bill.name}</p>
                <p className="font-normal">
                  {new Date(bill.date).getDate()} {new Date(bill.date).toLocaleString('id', { month: 'long' })} {new Date(bill.date).getFullYear()}{' '}
                  {bill.startTime}
                </p>
                <Separator className="h-[0.5px] bg-black my-2" />
                <p>Total : Rp{bill.price.toLocaleString('id')}</p>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-5">
            <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <AlertDialogTrigger asChild>
                <Button
                  className="w-full bg-transparent border-#05312A border text-sm text-#05312A font-bold flex justify-around px-0"
                  variant={'ghost'}
                  disabled={!bill ? true : false}
                >
                  Bayar Tunai
                  <PiMoneyLight size={35} />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Create Booking</AlertDialogTitle>
                  <AlertDialogDescription>Are you sure you want to create this booking?</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction className="bg-#05312A hover:bg-#02221D" onClick={(e) => handleCreateBooking(e)}>
                    Yes
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Button className="w-full px-0 font-bold text-sm bg-#05312A text-white" variant={'outline'}>
              Cetak Struk
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default SidebarBill;
