import { ApexOptions } from 'apexcharts';
import { format, parse } from 'date-fns';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
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
  const [appointments, setAppointments] = useState<TAppointment[]>([
    { barber: 'Denny', start: new Date('12/1/2023, 11:00:00'), end: new Date('12/1/2023, 12:00:00') },
    { barber: 'Fathola', start: new Date('12/1/2023, 15:00:00'), end: new Date('12/1/2023, 16:00:00') },
    { barber: 'Fathola', start: new Date('12/2/2023, 15:00:00'), end: new Date('12/2/2023, 16:00:00') },
    { barber: 'Fathola', start: new Date('12/1/2023, 09:30:00'), end: new Date('12/1/2023, 10:30:00') },
    { barber: 'Helos', start: new Date('12/1/2023, 13:30:00'), end: new Date('12/1/2023, 14:30:00') },
  ]);

  useEffect(() => {
    /* TODO:
    Write code for fetch queue data by date,
    and update the appointment state from fetch response.
    So the queue chart will always re-render whenever
    date change.

    NB: Date from fetch response should be formatted
    with .toLocaleString() before inserted to appointments state.
    */
  }, [date]);

  return (
    <div className="w-full flex items-center justify-center mt-28">
      <div className="w-2/3">
        <div className="flex justify-between items-center">
          <TitleFrame color="white">
            <h2 className="uppercase font-anton text-5xl py-2 text-white">See Queue</h2>
          </TitleFrame>
          <DatePicker {...{ today, date, setDate }} />
        </div>
        <div className="mt-14">
          <ChartQueue {...{ date, appointments }} />
        </div>
      </div>
    </div>
  );
}
