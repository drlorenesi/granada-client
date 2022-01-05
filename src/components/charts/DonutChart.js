import Chart from 'react-apexcharts';
import { formatDec } from '../../utils/formatUtils';

export default function DonutChart({ title, series, labels, width }) {
  const options = {
    labels,
    title: {
      text: title,
      align: 'left',
    },
    dataLabels: {
      enabled: true,
    },
    yaxis: {
      labels: {
        formatter: (value) => formatDec(value),
      },
    },
    chart: {
      toolbar: {
        show: true,
      },
      animations: {
        enabled: true, // default 'true'
      },
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          chart: {
            width: 380,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  return <Chart series={series} options={options} type='donut' width={width} />;
}
