import React from 'react';
import pluginId from '../../pluginId';
import { Layout, BaseHeaderLayout } from '@strapi/design-system';

const HomePage = () => {
  return (
    <div>
      <BaseHeaderLayout
          title="Metrics"
          subtitle={`le sous-titre de la page si ya besoin`}
          as="h2"
        />
    </div>
  );
};

export default HomePage;
