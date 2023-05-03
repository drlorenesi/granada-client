import Chart from 'react-apexcharts';
import { formatDec } from '../../utils/formatUtils';

export default function AreaChart({ title, series, labels, width }) {
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
    chart: {
      stacked: false,
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: false,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: false,
        },
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 90, 100],
      },
    },
    dataLabels: {
      enabled: false, // default 'true'
    },
    stroke: {
      curve: 'smooth', // 'straight'
    },
  };

  return <Chart series={series} options={options} type='area' width={width} />;
}
