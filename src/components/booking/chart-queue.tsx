import { ApexOptions } from 'apexcharts';
import { format } from 'date-fns';
import dayjs from 'dayjs';
import moment from 'moment';
import dynamic from 'next/dynamic';
import { TAppointment } from './booking-queue';

export default function ChartQueue({ date, appointments }: { date: Date | undefined; appointments: TAppointment[] }) {
  const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

  const barColor = {
    Denny: '#FF6634',
    Fathola: '#009865',
    Helos: '#0265CB',
  };

  const chartData: ApexOptions = {
    series: [
      {
        name: 'Appointments',
        data: appointments.map((appointment) => ({
          x: appointment.barber,
          y: [dayjs(appointment.start).valueOf(), dayjs(appointment.end).valueOf()],
          fillColor: barColor[appointment.barber as keyof typeof barColor],
        })),
      },
    ],
    chart: {
      height: 176,
      type: 'rangeBar',
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '80%',
      },
    },
    xaxis: {
      type: 'datetime',
      position: 'top',
      min: new Date(date?.toLocaleDateString() + ', 08:00:00').getTime(),
      max: new Date(date?.toLocaleDateString() + ', 16:00:00').getTime(),
      tickAmount: 16,
      labels: {
        style: { colors: ['#ffffff'] },
        format: 'HH:mm',
        formatter: function (value) {
          return dayjs(value).format('HH:mm');
        },
        datetimeUTC: false,
      },
    },
    yaxis: {
      labels: {
        style: { colors: ['#ffffff'] },
      },
    },
    grid: { padding: { right: 15 } },
    tooltip: {
      custom: function ({ dataPointIndex, w }) {
        const series = w.config.series[0].data;
        const start = series[dataPointIndex].y[0];
        const end = series[dataPointIndex].y[1];
        return dayjs(start).format('HH:mm') + ' - ' + dayjs(end).format('HH:mm');
      },
      y: {
        title: {
          formatter: function () {
            return '';
          },
        },
      },
    },
  };

  return <>{typeof window !== 'undefined' && <Chart type="rangeBar" options={chartData} series={chartData.series} />}</>;
}
