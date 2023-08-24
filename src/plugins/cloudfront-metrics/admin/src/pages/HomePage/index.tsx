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
} from 'chart.js'
import UptimeChart from './charts/UptimeChart';
import React from 'react';
import { Duration } from './charts/enums';
import LatencyChart from './charts/LatencyChart';
import draft from './charts/draft.json';
import BroadcastQualityChart from './charts/BroadcastQualityChart';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
);

const HomePage = () => {
  return (
    <div>
      <h1>{pluginId}&apos;s HomePage</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
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
      </div>
    </div>
  );
};

export default HomePage;
