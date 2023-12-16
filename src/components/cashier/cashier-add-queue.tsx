/* eslint-disable react-hooks/exhaustive-deps */
import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { PlusIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';
import { useGetAllService } from '@/hooks/query';
import useBill from '@/hooks/store/useBill';
import { cn } from '@/libs/utils';
import { CalendarIcon } from '../icons';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

type TService = {
  id: string;
  name: string;
  price: number;
};

export default function CashierAddQueue() {
  const [bookingDate, setBookingDate] = useState<Date>();
  const [minDateBooking, setMinDateBooking] = useState<Date>();
  const [minTimeBooking, setMinTimeBooking] = useState<Date>();
  const [selectedService, setSelectedService] = useState<TService | null>(null);
  const bill = useBill((state) => state.bill);
  const addToBill = useBill((state) => state.addToBill);
  const addBillResetHandler = useBill((state) => state.addBillResetHandler);
  const isBillSet = bill ? true : false;

  const resetForm = () => {
    setBookingDate(undefined);
    setSelectedService(null);
    setValue('name', '');
    setMinTimeBooking(undefined);
    setMinDateBooking(undefined);
  };

  addBillResetHandler(resetForm);
  const { data: allService } = useGetAllService();
  const isLoading = false;

  const bookingSchema = z.object({
    name: z.string().min(1, 'Name is required!'),
  });
  type BookingValidationSchema = z.infer<typeof bookingSchema>;

  const { register, handleSubmit, setValue } = useForm<BookingValidationSchema>({
    resolver: zodResolver(bookingSchema),
  });

  const onSubmit: SubmitHandler<BookingValidationSchema> = async (data) => {
    if (!selectedService) {
      return toast.error('Please choose a service!');
    }
    const bookingData = {
      ...data,
      date: dayjs(bookingDate).format('YYYY-MM-DD'),
      startTime: dayjs(bookingDate).format('HH:mm'),
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      price: selectedService.price,
    };

    addToBill(bookingData);
  };

  const handleMinTimeBooking = () => {
    const now = dayjs();
    const currentHour = now.hour();
    const currentMinute = now.minute();
    const nextHour = now.add(1, 'hour').hour();

    if (bookingDate && dayjs(bookingDate).isSame(now, 'date')) {
      if (currentHour < 8) {
        return now.hour(8).minute(0).toDate();
      } else if (currentHour >= 8 && currentHour <= 15) {
        if (currentMinute < 10) {
          return now.hour(currentHour).minute(0).toDate();
        } else if (currentMinute < 40) {
          return now.hour(currentHour).minute(30).toDate();
        } else {
          return now.hour(nextHour).minute(0).toDate();
        }
      } else if (currentHour > 15) {
        return now.hour(16).toDate();
      }
    } else if ((bookingDate && dayjs(bookingDate).isAfter(now, 'date')) || !bookingDate) {
      return now.hour(8).minute(0).toDate();
    }
  };

  const handleMinDateBooking = () => {
    const today = dayjs();
    if (today.isAfter(today.hour(15).minute(45))) {
      return dayjs().add(1, 'day').toDate();
    }
    return today.toDate();
  };

  useEffect(() => {
    setMinTimeBooking(handleMinTimeBooking());
    setMinDateBooking(handleMinDateBooking());
  }, [bookingDate]);

  return (
    <div className="w-full flex flex-col">
      <span className="text-base font-bold text-black">Tambah Antrian</span>
      <form className="border border-#02221D bg-#ECF4F3 rounded-[10px] p-3 mt-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full flex gap-8">
          <div className="flex flex-col w-1/2">
            <Label htmlFor="name" className="font-medium text-sm text-black mb-2">
              Name
            </Label>
            <Input type="text" id="name" placeholder="Input your name" required disabled={isLoading || isBillSet} {...register('name')} />
          </div>
          <div className="flex flex-col w-1/2">
            <Label htmlFor="name" className="font-medium text-sm text-black mb-2">
              Date & Time
            </Label>
            <ReactDatePicker
              placeholderText="Input date and time"
              showTimeSelect
              selected={bookingDate}
              onChange={(date) => {
                const currentHour = dayjs().hour();
                const currentMinute = dayjs().minute();
                const selectedDate = dayjs(date);
                const selectedHour = selectedDate.hour();
                const tomorrow = dayjs().add(1, 'day');

                if (selectedDate.isSame(dayjs(), 'day')) {
                  if (currentHour < 8) {
                    return setBookingDate(selectedHour < 8 ? selectedDate.hour(8).minute(0).toDate() : selectedDate.toDate());
                  } else if (currentHour >= 8 && currentHour <= 15) {
                    if (currentMinute < 10) {
                      return setBookingDate(selectedDate.hour(selectedHour).minute(0).toDate());
                    } else if (currentMinute < 40) {
                      return setBookingDate(selectedDate.hour(selectedHour).minute(30).toDate());
                    } else {
                      return setBookingDate(selectedDate.hour(selectedDate.add(1, 'hour').hour()).minute(0).toDate());
                    }
                  } else if (currentHour > 15) {
                    if (selectedDate.add(1, 'day').isSame(tomorrow, 'date')) {
                      return setBookingDate(selectedDate.add(1, 'day').hour(8).minute(0).toDate());
                    } else {
                      return setBookingDate(selectedDate.hour(8).minute(0).toDate());
                    }
                  }
                } else {
                  if (selectedDate.hour() < 8 || selectedDate.hour() > 15) {
                    return setBookingDate(selectedDate.hour(8).minute(0).toDate());
                  }
                  return setBookingDate(selectedDate.toDate());
                }
              }}
              minDate={minDateBooking}
              dateFormat="d MMMM yyyy, HH:mm"
              timeFormat="HH:mm"
              showMonthDropdown
              disabled={isLoading || isBillSet}
              required={!bookingDate ? true : false}
              minTime={minTimeBooking}
              maxTime={
                bookingDate
                  ? dayjs(bookingDate as Date)
                      .hour(15)
                      .minute(30)
                      .toDate()
                  : dayjs().hour(15).minute(30).toDate()
              }
              className="h-10 w-full rounded-md border bg-white pl-3 text-sm"
            />
            <CalendarIcon className="h-10 w-6 text-[#b3b3b3] absolute right-[17px]" />
          </div>
        </div>
        <div className="mt-3">
          <span className="pb-2 text-sm font-medium text-black">Pilih Layanan</span>
          <div className="grid grid-cols-2 mt-2 gap-x-8 gap-y-2">
            {allService?.data?.map((service: any) => (
              <Button
                className={cn(
                  'w-full h-full border border-#05312A rounded p-2 bg-white flex flex-col justify-start items-start',
                  selectedService?.id === service.id && 'bg-#05312A hover:bg-#05312A text-white hover:text-white'
                )}
                variant={'ghost'}
                key={service.id}
                type="button"
                disabled={isLoading || isBillSet}
                onClick={() => setSelectedService({ id: service.id, name: service.name, price: service.price })}
              >
                <span className={cn('uppercase font-anton text-2xl text-#05312A', selectedService?.id === service.id && 'text-white')}>
                  {service.name}
                </span>
                <div className={cn('grid grid-cols-1 flex-wrap items-around w-full gap-1', service.information?.includes(', ') && 'grid-cols-3')}>
                  {service.information?.includes(', ') ? (
                    service.information?.split(', ').map((information: string, key: number) => (
                      <div className="flex gap-[5px] items-center" key={`${service.id}-${key}`}>
                        <PlusIcon color={selectedService?.id === service.id ? 'white' : 'black'} size={12} />
                        <p className="text-xs">{information}</p>
                      </div>
                    ))
                  ) : (
                    <div className="flex gap-[5px] w-full items-center">
                      <p className="text-xs">{service.information}</p>
                    </div>
                  )}
                </div>
              </Button>
            ))}
          </div>
          <Button className="uppercase bg-#05312A hover:bg-#02221D font-semibold w-full mt-3" type="submit" disabled={isLoading || isBillSet}>
            Tambah
          </Button>
        </div>
      </form>
    </div>
  );
}
