import { Duration } from '../../enums';
import UptimeChart from './charts/UptimeChart';
import LatencyChart from './charts/LatencyChart';
import draft from './charts/draft.json';
import BroadcastQualityChart from './charts/BroadcastQualityChart';
import ErrorRateChart from './charts/ErrorRateChart';
import ServiceAvailabilityChart from './charts/ServiceAvailabilityChart';
import React from 'react';

export const OperationalMetrics = () => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', padding: '1em' }} id={'operational-metrics'}>
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
      <ErrorRateChart
        percentage={draft["error-rates"].percentage}
      />
      <ServiceAvailabilityChart
        data={draft["service-availability"].data}
        period={draft["service-availability"].period}
        duration={draft["service-availability"].duration as Duration}
      />
    </div>
  );
}

export default OperationalMetrics;
