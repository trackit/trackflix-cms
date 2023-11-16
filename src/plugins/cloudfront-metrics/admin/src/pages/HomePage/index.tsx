/*
 *
 * HomePage
 *
 */

import { DesignSystemProvider, darkTheme } from '@strapi/design-system';

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
import OperationalMetrics from './components/OperationalMetrics';
import VideoMetrics from './components/VideoMetrics';
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
      <OperationalMetrics />
      <VideoMetrics />
    </div>
  );
};

export default HomePage;
