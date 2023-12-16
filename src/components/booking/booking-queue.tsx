/* eslint-disable react-hooks/exhaustive-deps */
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useGetAllEmployee, useGetBookingChart } from '@/hooks/query';
import useBill from '@/hooks/store/useBill';
import { IEmployeeData } from '@/interfaces';
import TitleFrame from '../home/title-frame';
import DatePicker from '../ui/date-picker';
import ChartQueue from './chart-queue';

export type TAppointment = {
  barber: string;
  start: Date;
  end: Date;
};

export default function BookingQueue() {
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
    <div className="w-full flex items-center justify-center mt-28">
      <div className="w-2/3">
        <div className="flex justify-between items-center">
          <TitleFrame color="white">
            <h2 className="uppercase font-anton text-5xl py-2 text-white">See Queue</h2>
          </TitleFrame>
          <DatePicker disablePastDay {...{ today, date, setDate }} />
        </div>
        <div className="mt-14">
          <ChartQueue {...{ date, appointments, listEmployee: listEmployee?.data }} />
        </div>
      </div>
    </div>
  );
}
