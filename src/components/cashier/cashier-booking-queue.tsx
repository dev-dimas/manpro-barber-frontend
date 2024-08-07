/* eslint-disable react-hooks/exhaustive-deps */
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useGetAllEmployee, useGetBookingChart } from '@/hooks/query';
import useBill from '@/hooks/store/useBill';
import { IEmployeeData } from '@/interfaces';
import { TAppointment } from '../booking/booking-queue';
import DatePicker from '../ui/date-picker';
import CashierChartQueue from './cashier-chart-queue';

export default function CashierBookingQueue() {
  const today = new Date();
  const [date, setDate] = useState<Date | undefined>(today);
  const [appointments, setAppointments] = useState<TAppointment[]>([]);
  const { data: listEmployee, isSuccess: isFetchListEmployeeSuccess } = useGetAllEmployee();
  const { mutate: getChartData } = useGetBookingChart();
  const billLog = useBill((state) => state.billLog);
  const defaultQueue: TAppointment[] = listEmployee?.data?.map((employee: IEmployeeData) => ({ barber: employee.name, start: null, end: null }));

  useEffect(() => {
    getChartData(
      { date: dayjs(date).format('YYYY-MM-DD') },
      {
        onSuccess: (res) => {
          console.log(res);
          if (res?.data?.length) {
            const queue = res?.data?.map((data: TAppointment) => ({
              barber: data.barber,
              start: new Date(data.start).toLocaleString(),
              end: new Date(data.end),
            }));
            setAppointments([...defaultQueue, ...queue]);
            return;
          }
          setAppointments(defaultQueue);
        },
        onError: () => {
          setAppointments(defaultQueue);
        },
      }
    );
  }, [date, billLog, getChartData, listEmployee]);

  if (!isFetchListEmployeeSuccess) return null;

  return (
    <div className="flex flex-col w-full">
      <div className="flex w-full justify-between">
        <span className="text-black text-base font-bold">Booking</span>
        <DatePicker disablePastDay {...{ today, date, setDate }} />
      </div>
      <CashierChartQueue {...{ date, appointments, listEmployee: listEmployee?.data }} />
    </div>
  );
}
