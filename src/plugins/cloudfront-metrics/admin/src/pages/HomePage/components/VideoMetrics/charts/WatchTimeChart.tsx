import { Typography, Card } from '@strapi/design-system';
import { Line } from 'react-chartjs-2';
import React from "react";
import styled from '@emotion/styled';

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

const WatchTimeWrapper = styled.div`
  display: grid;
  @media screen and (min-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (max-width: 900px) {
    grid-template-columns: repeat(1, 1fr);
    gap: 2em;
  }
  gap: 1em;
  padding-top: 1em;
`

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
      <WatchTimeWrapper>
        <WatchTimeInformation name="Average view duration" value={props.metrics["avg-view-duration"]} />
        <WatchTimeInformation name="Watch time (minutes)" value={props.metrics["avg-watch-time"]} />
        <WatchTimeInformation name="Views" value={props.metrics["views"]} />
      </WatchTimeWrapper>
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
