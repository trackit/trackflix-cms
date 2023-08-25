import { Doughnut } from "react-chartjs-2";
import React from "react";
import { Chart } from "chart.js";

interface DoughnutChartProps {
  percentage: number,
}

const DoughnutChart = (props: DoughnutChartProps) => {
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
  const data = {
    datasets: [{
      label: 'Percentage of errors',
      data: [percentageRatio, 1 - percentageRatio],
      backgroundColor: ['rgba(0, 0, 255, 0.2)', 'rgba(0, 0, 0, 0)'],
      borderColor: ['blue', 'rgba(0, 0, 0, 0)'],
    }]
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Doughnut data={data} options={options} plugins={plugins} />
    </div>
  );
}

export default DoughnutChart;
