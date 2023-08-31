import { Duration } from '../../enums';
import UptimeChart from './charts/UptimeChart';
import LatencyChart from './charts/LatencyChart';
import draft from './charts/draft.json';
import BroadcastQualityChart from './charts/BroadcastQualityChart';
import ErrorRateChart from './charts/ErrorRateChart';
import ServiceAvailabilityChart from './charts/ServiceAvailabilityChart';
import React from 'react';
import styled from '@emotion/styled';

const OperationalMetricsWrapper = styled.div`
  display: grid;
  gap: 20px;
  padding: 1em;
  grid-template-columns: repeat(3, 1fr);
  @media screen and (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 900px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const OperationalMetrics = () => {
  return (
    <OperationalMetricsWrapper>
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
    </OperationalMetricsWrapper>
  );
}

export default OperationalMetrics;
