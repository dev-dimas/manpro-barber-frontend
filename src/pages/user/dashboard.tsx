import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import TitlePage from '@/components/TitlePage';
import { Separator } from '@/components/ui/separator';
import { useGetUserDashboard } from '@/hooks/query';
import LoggedUserLayout from '@/layout/logged-user-layout';

export default function Dashboard() {
  const { data: dashboard, isLoading } = useGetUserDashboard();
  const [dashboardData, setDashboardData] = useState<any>(undefined);

  useEffect(() => {
    if (dashboard) {
      if (dashboard.statusCode === 200) {
        setDashboardData(dashboard?.data);
      }
    }
  }, [dashboard]);

  const SkeletonUi = () => {
    return (
      <>
        <div className="bg-#ECF4F3 w-full rounded-2xl text-#02221D py-5 flex flex-col">
          <span className="px-4 font-semibold">Waiting Queue</span>
          <Separator className="my-3 bg-[#d9d9d9]" />
          <div className="px-4 w-full flex text-xs">
            <div className="w-1/2 flex">
              <div className="w-1/2 pr-5">
                <Skeleton baseColor="#d9d9d9" />
              </div>
              <div className="w-1/2 pr-8">
                <Skeleton baseColor="#d9d9d9" />
              </div>
            </div>
            <div className="w-1/2">
              <Skeleton baseColor="#d9d9d9" width={'50%'} />
            </div>
          </div>
          <div className="pt-11 px-4 text-9xl">
            <Skeleton baseColor="#d9d9d9" width={'22%'} />
          </div>
        </div>
        <div className="flex gap-3 text-#02221D mt-[14px]">
          <div className="py-3 bg-#ECF4F3 w-1/2 rounded-2xl">
            <span className="px-4 font-semibold">Successful Haircut</span>
            <Separator className="my-3 bg-[#d9d9d9]" />
            <div className="px-4 text-2xl font-anton">
              <Skeleton baseColor="#d9d9d9" width={'60%'} />
            </div>
          </div>
          <div className="py-3 bg-#ECF4F3 w-1/2 rounded-2xl">
            <span className="px-4 font-semibold">Last Time Getting a Haircut</span>
            <Separator className="my-3 bg-[#d9d9d9]" />
            <div className="px-4 text-2xl font-anton">
              <Skeleton baseColor="#d9d9d9" width={'75%'} />
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <LoggedUserLayout>
      <TitlePage>Dashboard - Barberqueue</TitlePage>
      {isLoading ? (
        <SkeletonUi />
      ) : (
        <>
          <div className="bg-#ECF4F3 w-full rounded-2xl text-#02221D py-5 flex flex-col">
            <span className="px-4 font-semibold">Waiting Queue</span>
            <Separator className="my-3 bg-[#d9d9d9]" />
            <div className="px-4 w-full flex text-xs">
              {dashboardData?.booking ? (
                <>
                  <div className="w-1/2 flex">
                    <p className="w-1/2">{dashboardData.booking.name}</p>
                    <p className="w-1/2">
                      {dayjs(dashboardData.booking.date).hour(dashboardData.booking.startTime.slice(1, 2)).format('DD-MM-YYYY HH:mm')}
                    </p>
                  </div>
                  <p className="w-1/2">{dashboardData.serviceName}</p>
                </>
              ) : (
                <p>You dont have any order queue. Lets make order!</p>
              )}
            </div>
            {dashboardData?.queue && <span className="pt-11 px-4 text-9xl font-anton">{dashboardData.queue}</span>}
          </div>
          <div className="flex gap-3 text-#02221D mt-[14px]">
            <div className="py-3 bg-#ECF4F3 w-1/2 rounded-2xl">
              <span className="px-4 font-semibold">Successful Haircut</span>
              <Separator className="my-3 bg-[#d9d9d9]" />
              <span className="px-4 text-2xl font-anton">{dashboardData?.transactionSucces} Transactions</span>
            </div>
            <div className="py-3 bg-#ECF4F3 w-1/2 rounded-2xl">
              <span className="px-4 font-semibold">Last Time Getting a Haircut</span>
              <Separator className="my-3 bg-[#d9d9d9]" />
              <span className="px-4 text-2xl font-anton">
                {dashboardData?.lastTimeHaircut.length > 0
                  ? dayjs(`${dashboardData.lastTimeHaircut[0].date} ${dashboardData.lastTimeHaircut[0].startTime}`).format('dddd, DD-MM-YYYY HH:mm')
                  : '-'}
              </span>
            </div>
          </div>
        </>
      )}
    </LoggedUserLayout>
  );
}
