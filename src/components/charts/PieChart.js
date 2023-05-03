import Chart from 'react-apexcharts';
import { formatDec } from '../../utils/formatUtils';

export default function PieChart({ title, series, labels, width }) {
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
            width: 390,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  return <Chart series={series} options={options} type='pie' width={width} />;
}
