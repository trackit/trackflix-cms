import { Combobox, ComboboxOption, Card, CardHeader, CardContent, Typography } from '@strapi/design-system';
import { Video, Interactions } from '../../interfaces';
import draft from './charts/draft.json';
import WatchTimeChart from './charts/WatchTimeChart';
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faThumbsUp,
  faComment,
  faShareFromSquare,
  faClock,
} from '@fortawesome/free-solid-svg-icons';
import DevicesChart from './charts/DevicesChart';
import RecommendationChart from './charts/RecommendationChart';
import styled from '@emotion/styled';

interface SelectVideoProps {
  streams: Video[];
  selectedStream: Video|undefined;
  setSelectedStream: any;
  setMetrics: any;
}

const VideoInformationWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 1em;
  padding-top: 1em;
  @media screen and (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Interaction = ({ value, icon } : { value: any, icon: IconProp }) => {
  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <FontAwesomeIcon
          size='2xl'
          icon={icon}
          color='white'
        />
        <Typography
          variant='beta'
          style={{ paddingTop: '0.5em' }}
        >
          {value}
        </Typography>
      </div>
    </div>
  );
}

const UserInteractions = ({ interactions } : { interactions: Interactions }) => {
  return (
    <Card>
      <CardHeader style={{ height: '20%' }}>
        <Typography style={{ display: 'flex', justifyContent: 'center', padding: '1em' }} variant="alpha">User Interactions</Typography>
      </CardHeader>
      <CardContent style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 0.2fr)', justifyContent: 'center', height: '80%', placeItems: 'center' }}>
          <Interaction value={interactions.likes} icon={faThumbsUp} />
          <Interaction value={interactions.comments} icon={faComment} />
          <Interaction value={interactions.shares} icon={faShareFromSquare} />
          <Interaction value={interactions.minutes} icon={faClock} />
      </CardContent>
    </Card>
  );
}

const SelectVideo = (props: SelectVideoProps) => {
  return (
    <Combobox
      label="Select a video"
      placeholder="Video name"
      value={props.selectedStream}
      onChange={(value) => {
        props.setSelectedStream(props.streams.find((stream: Video) => stream.id === value));
        props.setMetrics(props.streams.find((stream: Video) => stream.id === value)?.metrics);
      }}
      autocomplete={'none'}
    >
      {props.streams.map((stream: Video) => (
        <ComboboxOption key={stream.id} value={stream.id}>
          {stream.name}
        </ComboboxOption>
      ))}
    </Combobox>
  );
}

const VideoMetrics = () => {
  const [selectedStream, setSelectedStream] = useState<Video | undefined>();
  const [metrics, setMetrics] = useState<any>();
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (selectedStream && metrics) {
      setKey((prevKey) => prevKey + 1);
    }
  }, [selectedStream, metrics]);

  return (
    <div style={{ padding: '1em' }}>
      <div style={{ paddingBottom: '1em', justifyContent: 'center', display: 'flex' }}>
        <SelectVideo
          streams={draft['videos-list']}
          selectedStream={selectedStream}
          setSelectedStream={setSelectedStream}
          setMetrics={setMetrics}
          />
      </div>
      {
        selectedStream && metrics ? (
        <div>
          <WatchTimeChart
            key={key}
            metrics={selectedStream.metrics}
          />
          <VideoInformationWrapper>
            <UserInteractions
              interactions={selectedStream.interactions!}
            />
            <DevicesChart
              devices={metrics.devices}
            />
            <RecommendationChart
              users={draft.users}
            />
          </VideoInformationWrapper>
        </div>
        ) : null
      }
    </div>
  );
}


export default VideoMetrics;