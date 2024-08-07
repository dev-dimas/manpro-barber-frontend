import { ApexOptions } from 'apexcharts';
import dayjs from 'dayjs';
import dynamic from 'next/dynamic';
import { IEmployeeData } from '@/interfaces';
import { TAppointment } from '../booking/booking-queue';

export default function CashierChartQueue({
  date,
  appointments,
  listEmployee,
}: {
  date: Date | undefined;
  appointments: TAppointment[];
  listEmployee: IEmployeeData[];
}) {
  const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

  const color = ['#FF6634', '#009865', '#0265CB', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#00FFFF', '#FF00FF', '#C0C0C0'];
  let barColor: any = [];
  listEmployee.map((employee, index) => (barColor[employee.name] = color[index]));

  const chartData: ApexOptions = {
    series: [
      {
        name: 'Appointments',
        data: appointments?.map((appointment) => ({
          x: appointment.barber,
          y: [dayjs(appointment.start).valueOf(), dayjs(appointment.end).valueOf()],
          fillColor: barColor[appointment.barber as keyof typeof barColor],
        })),
      },
    ],
    chart: {
      height: 144,
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
        style: { colors: ['#000000'] },
        format: 'HH:mm',
        formatter: function (value) {
          return dayjs(value).format('HH:mm');
        },
        datetimeUTC: false,
      },
    },
    yaxis: {
      labels: {
        style: { colors: ['#000000'] },
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

  return <>{typeof window !== 'undefined' && <Chart type="rangeBar" options={chartData} series={chartData.series} height={195} />}</>;
}
