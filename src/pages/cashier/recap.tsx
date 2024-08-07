import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import ChartRecap from '@/components/cashier/recap/chart-recap';
import TitlePage from '@/components/TitlePage';
import DatePicker from '@/components/ui/date-picker';
import { useGetDataRecap } from '@/hooks/query';
import { CashierLayout } from '@/layout';

type TRecapData = {
  daily: TPeriodData[];
  weekly: TPeriodData[];
  monthly: TPeriodData[];
  yearly: TPeriodData[];
};

export type TPeriodData = {
  date: string;
  total: number;
};

const Recap = () => {
  const today = new Date();
  const [date, setDate] = useState<Date | undefined>(today);
  const [recapData, setRecapData] = useState<TRecapData>();
  const { mutate: getDataRecap } = useGetDataRecap();

  useEffect(() => {
    getDataRecap(
      { date: dayjs(date).format('YYYY-MM-DD') },
      {
        onSuccess: (res) => {
          setRecapData(res.data);
        },
      }
    );
  }, [date, getDataRecap]);

  return (
    <CashierLayout>
      <TitlePage>Rekap - Cutboss Barbershop</TitlePage>
      <div className="w-full flex justify-end">
        <DatePicker {...{ today, date, setDate }} />
      </div>

      <span className="text-base font-bold block">Rekap Harian</span>
      <ChartRecap recapData={recapData?.daily || []} range="daily" />

      <span className="text-base font-bold mt-9 block">Rekap Mingguan</span>
      <ChartRecap recapData={recapData?.weekly || []} range="weekly" />

      <span className="text-base font-bold mt-9 block">Rekap Bulanan</span>
      <ChartRecap recapData={recapData?.monthly || []} range="monthly" />

      <span className="text-base font-bold mt-9 block">Rekap Tahunan</span>
      <ChartRecap recapData={recapData?.yearly || []} range="yearly" />
    </CashierLayout>
  );
};

export default Recap;
