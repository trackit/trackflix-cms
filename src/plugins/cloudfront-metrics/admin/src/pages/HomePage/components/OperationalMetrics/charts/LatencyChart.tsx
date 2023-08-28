import { Line } from "react-chartjs-2";
import React from 'react';
import { Duration } from "../../../enums";

interface LatencyChartProps {
  data: number[];
  period: number;
  duration: Duration;
}

const LatencyChart = (props: LatencyChartProps) => {
  if (props.data.length !== props.period)
    throw new Error('Data and period must be the same length');

  const labels = Array.from({ length: props.period }, (_, i) => {
    if (i === 0) {
      return `${props.period} days ago`;
    } else if (i === props.period - 1) {
      return 'Now';
    } else {
      return '';
    }
  });

  const data = {
    labels: labels,
    datasets: [
      {
        fill: true,
        label: 'Latency',
        data: props.data,
        borderColor: 'blue',
        backgroundColor: 'rgba(0, 0, 255, 0.2)',
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Latency',
      },
    },
    scales: {
      x: {
        title: {
          display: false,
          text: `${props.duration} Ago`,
        },
      },
      y: {
        min: 0,
        title: {
          display: true,
          text: 'Latency (ms)',
        },
      },
    },
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Line data={data} options={options} />
    </div>
  );
}

export default LatencyChart;
