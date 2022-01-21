import Chart from 'react-apexcharts';
import { formatDec } from '../../utils/formatUtils';

export default function HBarChart({ title, series, labels, width }) {
  const options = {
    title: {
      text: title,
      align: 'left',
    },
    xaxis: {
      categories: labels,
      labels: {
        formatter: (value) => formatDec(value),
      },
    },
    yaxis: {
      labels: {
        formatter: (value) => formatDec(value),
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
    tooltip: {
      x: {
        show: false,
      },
      y: {
        title: {
          formatter: function (val) {
            return '';
          },
        },
      },
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: {
            width: 390,
          },
        },
      },
    ],
  };

  return <Chart series={series} options={options} type='bar' width={width} />;
}
