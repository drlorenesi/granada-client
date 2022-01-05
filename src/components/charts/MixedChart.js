import Chart from 'react-apexcharts';
import { formatDec } from '../../utils/formatUtils';

export default function MixedChart({ title, series, labels, width }) {
  const options = {
    title: {
      text: title,
    },
    stroke: {
      width: [6, 6, 3],
      dashArray: [0, 0, 4],
      curve: 'straight', // 'straight'
    },
    plotOptions: {
      bar: {
        columnWidth: '70%',
      },
    },
    labels,
    yaxis: {
      labels: {
        formatter: (value) => formatDec(value),
      },
    },
    annotations: {
      yaxis: [
        {
          y: 1750,
          borderColor: '#00E396',
          label: {
            text: 'Récord',
            textAnchor: 'end',
            position: 'right',
            borderColor: '#00E396',
            style: {
              color: '#fff',
              background: '#00E396',
            },
          },
        },
      ],
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
  };

  return <Chart series={series} options={options} type='line' width={width} />;
}
