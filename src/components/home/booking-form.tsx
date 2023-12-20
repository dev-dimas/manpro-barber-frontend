/* eslint-disable react-hooks/exhaustive-deps */
import { zodResolver } from '@hookform/resolvers/zod';
import dayjs from 'dayjs';
import { Loader2Icon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { z } from 'zod';
import { useAddPayment, useCreateBookingByUser, useGetAllService } from '@/hooks/query';
import useBill from '@/hooks/store/useBill';
import useUser from '@/hooks/store/useUser';
import { CalendarIcon } from '../icons';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import TitleFrame from './title-frame';
import VShapeSide from './v-shape-side';

const BookingForm = ({ withVShape = false }: { withVShape?: boolean }) => {
  const user = useUser((state) => state.userData);
  const { data: res, isError } = useGetAllService();
  const [serviceCardList, setServiceCardList] = useState([]);
  const [bookingDate, setBookingDate] = useState<Date>();
  const [minDateBooking, setMinDateBooking] = useState<Date>();
  const [minTimeBooking, setMinTimeBooking] = useState<Date>();
  const { mutate: addPayment, isLoading: isLoadingPayment } = useAddPayment();
  const { mutate: createBooking, isLoading: isLoadingCreateBooking } = useCreateBookingByUser();
  const clearBill = useBill((state) => state.clearBill);
  const router = useRouter();

  const bookingSchema = z.object({
    name: z.string().min(1, 'Name is required!').min(3, 'Please input valid name!'),
    phone: z
      .string()
      .min(1, { message: 'Phone number is required' })
      .regex(new RegExp(/^(?:\+62|0)[0-9\-]+$/g), { message: 'Please input valid phone number!' })
      .min(10, { message: 'Please input valid phone number!' })
      .max(14, { message: 'Please input valid phone number!' }),
    serviceId: z.string(),
  });
  type BookingValidationSchema = z.infer<typeof bookingSchema>;

  const { register, handleSubmit, setValue, control } = useForm<BookingValidationSchema>({
    resolver: zodResolver(bookingSchema),
  });

  const onSubmit: SubmitHandler<BookingValidationSchema> = async (data) => {
    if (!user) toast.error('You need login to create a booking!');
    const bookingData = {
      ...data,
      date: dayjs(bookingDate).format('YYYY-MM-DD'),
      startTime: dayjs(bookingDate).format('HH:mm'),
      userId: user?.id,
    };
    let tokenPayment: string;
    addPayment(bookingData, {
      onSuccess: (res) => {
        if (res.statusCode === 409) {
          toast.error('Booking failed. Already full booked!');
          return;
        }
        tokenPayment = res.data?.payment?.token;

        (window as any).snap.pay(tokenPayment, {
          onSuccess: () => {
            createBooking(res.data.booking_details, {
              onSuccess: (res) => {
                if (res.statusCode === 201) {
                  toast.success('Successfully create booking');
                  setValue('name', '');
                  setValue('phone', '');
                  setValue('serviceId', '');
                  setBookingDate(undefined);
                  clearBill();
                  router.push(`/transaction/${res.data.id}`);
                } else if (res.statusCode === 409) {
                  toast.error('Booking failed. Already full booked!');
                }
              },
              onError: () => {
                toast.error('Something went wrong. Try again later');
              },
            });
          },
        });
      },
      onError: (error: any) => {
        if (error.statusCode === 409) {
          toast.error('Booking failed. Already full booked!');
        }
      },
    });
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
    const serviceList = res?.data?.map((service: any) => ({
      value: service.id,
      label: `${service.name.toUpperCase()} - Rp${service.price.toLocaleString('id')}`,
    }));
    setServiceCardList(serviceList);
  }, [res]);

  useEffect(() => {
    setMinTimeBooking(handleMinTimeBooking());
    setMinDateBooking(handleMinDateBooking());
  }, [bookingDate]);

  useEffect(() => {
    if (user) {
      setValue('name', user.name);
      setValue('phone', user.phone);
    }
    const snapScriptUrl = 'https://app.sandbox.midtrans.com/snap/snap.js';
    const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY;

    const script = document.createElement('script');
    script.src = snapScriptUrl;
    script.setAttribute('data-client-key', clientKey as string);
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  if (isError) return null;

  return (
    <>
      {withVShape && <VShapeSide foreground="#05312A" className="bg-#ECF4F3" />}
      <div className="w-full bg-#05312A flex justify-center pt-20 pb-24">
        <div className="w-2/3 rounded-3xl bg-#FFF000 py-16 relative">
          <div className="w-full pl-48 pr-16">
            <TitleFrame>
              <h2 className="uppercase font-anton text-5xl py-2 text-#05312A">Booking Now</h2>
            </TitleFrame>
          </div>
          <form className="pt-12 pl-52 pr-16 flex flex-col gap-10" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 justify-center items-center gap-5">
              <div className="grid w-full items-center gap-2">
                <Label htmlFor="name" className="font-medium text-sm">
                  Name
                </Label>
                <Input
                  type="text"
                  id="name"
                  placeholder="Input your name"
                  required
                  disabled={isLoadingPayment || isLoadingCreateBooking || !user}
                  {...register('name')}
                />
              </div>
              <div className="grid w-full items-center gap-2">
                <Label htmlFor="phone" className="font-medium text-sm">
                  Phone
                </Label>
                <Input
                  type="tel"
                  id="phone"
                  placeholder="Input your phone number"
                  required
                  disabled={isLoadingPayment || isLoadingCreateBooking || !user}
                  {...register('phone')}
                />
              </div>
              <div className="flex flex-col w-full justify-center gap-2">
                <Label htmlFor="datetime" className="font-medium text-sm">
                  Date & Time
                </Label>
                <div className="relative min-w-full grid">
                  <DatePicker
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
                    disabled={isLoadingPayment || isLoadingCreateBooking || !user}
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
              <div className="grid w-full items-center gap-2">
                <Label htmlFor="service" className="font-medium text-sm">
                  Select Service
                </Label>
                <Controller
                  control={control}
                  name="serviceId"
                  render={({ field }) => (
                    <Select
                      ref={field.ref}
                      placeholder="Choose a service"
                      options={serviceCardList}
                      value={serviceCardList?.find((c: any) => c.value === field.value)}
                      onChange={(val: any) => field.onChange(val.value)}
                      required
                      isDisabled={isLoadingPayment || isLoadingCreateBooking || !user}
                      className="text-sm"
                    />
                  )}
                />
              </div>
            </div>
            {user ? (
              <Button className="uppercase w-full bg-#05312A" type="submit" disabled={isLoadingPayment}>
                {isLoadingPayment || isLoadingCreateBooking ? (
                  <>
                    <Loader2Icon className="animate-spin mr-3" size={20} />
                    Loading. . .
                  </>
                ) : (
                  'Book Now'
                )}
              </Button>
            ) : (
              <Button className="uppercase w-full bg-#05312A" type="button" onClick={() => toast.info('You need to login before create a booking!')}>
                Book Now
              </Button>
            )}
          </form>
          <Image
            src="/images/chair.png"
            alt="Chair Image"
            width={402}
            height={530}
            className="absolute bottom-[-30px] left-[-180px] h-[450px] object-cover"
          />
        </div>
      </div>
    </>
  );
};

export default BookingForm;
