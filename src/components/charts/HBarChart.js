import Chart from 'react-apexcharts';
import { formatDec } from '../../utils/formatUtils';

export default function HBarChart({ title, series, labels, width }) {
  const options = {
    title: {
      text: 'Horizontal Bar Chart Example',
      align: 'left',
    },
    xaxis: {
      categories: [
        'South Korea',
        'Canada',
        'United Kingdom',
        'Netherlands',
        'Italy',
        'France',
        'Japan',
        'United States',
        'China',
        'Germany',
      ],
      labels: {
        formatter: (value) => formatDec(value),
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        barHeight: '90%',
        distributed: true,
        horizontal: true,
        dataLabels: {
          position: 'bottom',
        },
      },
    },
    dataLabels: {
      enabled: true,
      textAnchor: 'start',
      style: {
        colors: ['#fff'],
      },
      formatter: (val, opt) => opt.w.globals.labels[opt.dataPointIndex],
      offsetX: 0,
      dropShadow: {
        enabled: true,
      },
    },
    legend: {
      show: false,
    },
    chart: {
      animations: {
        enabled: true, // default 'true'
      },
    },
  };

  return <Chart series={series} options={options} type='bar' width={width} />;
}
