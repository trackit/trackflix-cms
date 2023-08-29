import { Combobox, ComboboxOption, Card, Typography } from '@strapi/design-system';
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

interface SelectVideoProps {
  streams: Video[];
  selectedStream: Video|undefined;
  setSelectedStream: any;
  setMetrics: any;
}

const WatchTimeInformation = ({ value, icon } : { value: any, icon: IconProp }) => {
  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <FontAwesomeIcon
          size='2xl'
          icon={icon}
          color='white'
        />
        <Typography
          variant="beta"
          style={{ margin: '0.5rem' }}
        >
          {value}
        </Typography>
      </div>
    </div>
  );
}

const UserInteractions = ({ interactions } : { interactions: Interactions }) => {
  return (
    <Card style={{ paddingTop: '1em' }}>
      <Typography style={{ display: 'flex', justifyContent: 'center' }} variant="alpha">User Interactions</Typography>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', paddingTop: '1em', }}>
        <WatchTimeInformation value={interactions.likes} icon={faThumbsUp} />
        <WatchTimeInformation value={interactions.comments} icon={faComment} />
        <WatchTimeInformation value={interactions.shares} icon={faShareFromSquare} />
        <WatchTimeInformation value={interactions.minutes} icon={faClock} />
      </div>
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
      <div style={{ width: '30%', paddingBottom: '1em' }}>
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'auto', gap: '1em', paddingTop: '1em' }}>
            <UserInteractions
              interactions={selectedStream.interactions!}
            />
            <DevicesChart
              devices={metrics.devices}
            />
            <RecommendationChart
              users={draft.users}
            />
          </div>
        </div>
        ) : null
      }
    </div>
  );
}


export default VideoMetrics;