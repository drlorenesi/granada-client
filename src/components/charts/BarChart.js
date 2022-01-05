import Chart from 'react-apexcharts';
import { formatDec } from '../../utils/formatUtils';

export default function BarChart({ title, series, labels, width }) {
  const options = {
    title: {
      text: title,
      align: 'left',
    },
    xaxis: {
      categories: labels,
    },
    yaxis: {
      labels: {
        formatter: (value) => formatDec(value),
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
    plotOptions: {
      bar: {
        barHeight: '100%',
        distributed: false,
        horizontal: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: true,
      position: 'bottom',
    },
    chart: {
      animations: {
        enabled: true, // default 'true'
      },
    },
  };

  return <Chart series={series} options={options} type='bar' width={width} />;
}
