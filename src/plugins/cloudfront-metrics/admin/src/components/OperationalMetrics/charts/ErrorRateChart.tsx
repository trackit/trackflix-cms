import { Doughnut } from "react-chartjs-2";
import React from "react";
import { Chart } from "chart.js";
import hexRgb from 'hex-rgb';
import  {Theme} from "../../../interfaces"
import {darkTheme } from "@strapi/design-system"
const customDarkTheme: Theme = darkTheme;

interface ErrorRateChartProps {
  percentage: number,
}

const ErrorRateChart = (props: ErrorRateChartProps) => {
  const percentageRatio = props.percentage / 100;

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    rotation: 270,
    circumference: 180,
    aspectRatio: 2.5,
  };
  const plugins = [
    {
      id: 'percentageText',
      beforeDatasetsDraw(chart: any, args: any, pluginOptions: any) {
        const { ctx } = chart;

        ctx.save();
        ctx.font = `bolder 20px ${Chart.defaults.font.family}`;
        ctx.fillStyle = Chart.defaults.color;
        ctx.textAlign = 'center';
        ctx.fillText(`${props.percentage}%`, chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y);
        ctx.fillText('Error rate', chart.getDatasetMeta(0).data[0].x, chart.getDatasetMeta(0).data[0].y - 30);
      }
    }
  ];

  const percentageColor = hexRgb(customDarkTheme.colors.primary600,  {format: 'css', alpha: 0.2});
  console.log(percentageColor.toString());
  const data = {
    datasets: [{
      label: 'Percentage of errors',
      data: [percentageRatio, 1 - percentageRatio],
      backgroundColor: [percentageColor, 'rgba(0, 0, 0, 0)'],
      borderColor: [customDarkTheme.colors.primary600, 'rgba(0, 0, 0, 0)'],
    }]
    
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Doughnut data={data} options={options} plugins={plugins} />
    </div>
  );
}

export default ErrorRateChart;
