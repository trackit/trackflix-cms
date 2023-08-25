/*
 *
 * HomePage
 *
 */

import pluginId from '../../pluginId';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  Filler,
  ArcElement,
} from 'chart.js'
import UptimeChart from './charts/UptimeChart';
import { Duration } from './charts/enums';
import LatencyChart from './charts/LatencyChart';
import draft from './charts/draft.json';
import BroadcastQualityChart from './charts/BroadcastQualityChart';
import DoughnutChart from './charts/DoughnutChart';
import React from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  Filler,
  ArcElement,
);

const HomePage = () => {
  return (
    <div>
      <h1>{pluginId}&apos;s HomePage</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', padding: '1em' }}>
        <UptimeChart
          data={draft.uptime.data}
          period={draft.uptime.period}
          duration={draft.uptime.duration as Duration}
        />
        <LatencyChart
          data={draft.latency.data}
          period={draft.latency.period}
          duration={draft.latency.duration as Duration}
        />
        <BroadcastQualityChart
          streams={draft["broadcast-quality"].streams}
        />
        <DoughnutChart
          percentage={draft["error-rates"].percentage}
        />
      </div>
    </div>
  );
};

export default HomePage;
