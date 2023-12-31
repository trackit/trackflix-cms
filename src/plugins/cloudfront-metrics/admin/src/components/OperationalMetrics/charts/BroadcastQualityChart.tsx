import { Combobox, ComboboxOption } from '@strapi/design-system';
import { Line } from 'react-chartjs-2';
import React, { useState } from 'react';
import { Stream } from '../../../interfaces';
import  {Theme} from "../../../interfaces"
import {darkTheme } from "@strapi/design-system"
import hexRgb from 'hex-rgb';
const customDarkTheme: Theme = darkTheme;

interface BroadcastQualityChartProps {
  streams: Stream[];
}

const BroadcastQualityChart = (props: BroadcastQualityChartProps) => {
  const [id, setId] = useState<string>('');

  const yLabels = ["HD", "FULL HD", "2K", "4K"];

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Broadcast Quality',
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
        startAtZero: true,
        ticks: {
          callback: (value: string) => {
            const index = Number(value);
            if (index >= 0 && index < yLabels.length) {
              return yLabels[index];
            }
            return '';
          },
        },
        title: {
          display: true,
          text: 'Quality',
        },
      },
    },
  } as any;

  const percentageColor = hexRgb(customDarkTheme.colors.primary600,  {format: 'css', alpha: 0.2});
  const data = {
    labels: props.streams.find((stream: Stream) => stream.id === id)?.data.map((val) => val.timestamp) || [],
    datasets: [
      {
        label: 'Quality',
        data: props.streams.find((stream: Stream) => stream.id === id)?.data.map((val) => yLabels.indexOf(val.quality)) || [],
        borderColor: customDarkTheme.colors.primary600, 
        backgroundColor: percentageColor,
      },
    ],
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      <Combobox placeholder="Select a stream id" label="Stream ID" value={id} onChange={setId} autocomplete={'none'} onClear={() => setId('')}>
        {props.streams.map((stream: Stream) => <ComboboxOption value={stream.id} key={`stream-${stream.id}`}>{stream.id}</ComboboxOption>)}
      </Combobox>
      <Line data={data} options={options} />
    </div>
  )
}

export default BroadcastQualityChart;
