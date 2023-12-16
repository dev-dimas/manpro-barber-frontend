import { ApexOptions } from 'apexcharts';
import dayjs from 'dayjs';
import dynamic from 'next/dynamic';
import { TPeriodData } from '@/pages/cashier/recap';

export default function ChartRecap({ recapData, range }: { recapData: TPeriodData[]; range: 'daily' | 'weekly' | 'monthly' | 'yearly' }) {
  const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

  const chartData: ApexOptions = {
    series: [
      {
        name: 'Pemasukan',
        data: recapData.map((data) => data.total) || null,
      },
    ],
    chart: {
      height: 250,
      type: 'bar',
      toolbar: {
        show: false,
      },
    },
    colors: ['#FFF000'],
    plotOptions: {
      bar: {
        borderRadius: 0,
        dataLabels: {
          position: 'top',
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: number) {
        return 'Rp' + val.toLocaleString('id');
      },
      offsetY: -20,
      style: {
        fontSize: '12px',
        colors: ['#304758'],
      },
    },

    xaxis: {
      categories:
        recapData.map((data) => {
          if (range === 'daily' || range === 'weekly') {
            return dayjs(data.date).format('DD MMMM');
          }
          if (range === 'monthly') {
            return dayjs(data.date).format('MMMM');
          }
          if (range === 'yearly') {
            return dayjs(data.date).format('YYYY');
          }
        }) || null,
      position: 'bottom',
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        fill: {
          type: 'gradient',
          gradient: {
            colorFrom: '#D8E3F0',
            colorTo: '#BED1E6',
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          },
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    yaxis: {
      axisBorder: {
        show: true,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        formatter: function (val) {
          return 'Rp' + val.toLocaleString('id');
        },
      },
    },
  };

  return <>{typeof window !== 'undefined' && <Chart options={chartData} series={chartData.series} type="bar" height={250} />}</>;
}
