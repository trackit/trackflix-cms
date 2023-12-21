import { Line } from "react-chartjs-2";
import { Duration } from "../../../enums";
import React from "react";
import  {Theme} from "../../../interfaces"
import {darkTheme } from "@strapi/design-system"
import hexRgb from "hex-rgb";
const customDarkTheme: Theme = darkTheme;

interface ServiceAvailabilityChartProps {
  data: number[];
  period: number;
  duration: Duration;
}

const ServiceAvailabilityChart = (props: ServiceAvailabilityChartProps) => {
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

  const options: any = {
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Service Availability',
      },
    },
    scales: {
      x: {
        title: {
          display: false,
          text: 'Time',
        },
      },
      y: {
        ticks: {
          callback: (value: string) => {
            return `${value}%`;
          },
        },
        title: {
          display: true,
          text: 'Availability',
        },
      },
    },
  };
  const percentageColor = hexRgb(customDarkTheme.colors.primary600,  {format: 'css', alpha: 0.2});
  const data = {
    labels: labels,
    datasets: [{
      label: 'Service Availability',
      data: props.data,
      backgroundColor: percentageColor,
      borderColor: customDarkTheme.colors.primary600,
    }]
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      <Line data={data} options={options} />
    </div>
  );
}

export default ServiceAvailabilityChart;
