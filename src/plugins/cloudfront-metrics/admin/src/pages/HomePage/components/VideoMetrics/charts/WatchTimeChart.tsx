import { Typography, Card } from '@strapi/design-system';
import { Line } from 'react-chartjs-2';
import React from "react";

interface WatchTimeChartProps {
  metrics: any;
}

const WatchTimeInformation = ({ name, value } : { name: string, value: string }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography
        variant="alpha"
        style={{ marginBottom: '0.5rem' }}
      >
        {value}
      </Typography>
      <Typography
        variant="omega"
      >
        {name}
      </Typography>
    </div>
  );
}

const WatchTimeChart = (props: WatchTimeChartProps) => {
  const options: any = {
    plugins: {
      legend: {
        display: false
      },
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        title: {
          display: true,
          text: 'Time',
          align: 'end',
        },
      },
      y: {
        grid: {
          display: false
        },
        title: {
          display: true,
          text: 'Viewers',
          align: 'end',
        },
      }
    }
  };
  const data = {
    labels: props.metrics["watch-time"].map((elem: any) => elem.timestamp),
    datasets: [
      {
        label: 'Viewers',
        data: props.metrics["watch-time"].map((elem: any) => elem.value),
        borderColor: '#007eff',
      }
    ]
  };

  return (
    <Card>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', paddingTop: '1em' }}>
        <WatchTimeInformation name="Average view duration" value={props.metrics["avg-view-duration"]} />
        <WatchTimeInformation name="Watch time (minutes)" value={props.metrics["avg-watch-time"]} />
        <WatchTimeInformation name="Views" value={props.metrics["views"]} />
      </div>
      <div
        style={{
          width: '100%',
          height: '300px',
          marginTop: '1em',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Line data={data} options={options} />
      </div>
    </Card>
  );
}

export default WatchTimeChart;
