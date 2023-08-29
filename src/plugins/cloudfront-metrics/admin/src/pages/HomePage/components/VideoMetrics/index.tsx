import { Combobox, ComboboxOption, Card } from '@strapi/design-system';
import { Video } from '../../interfaces';
import draft from './charts/draft.json';
import WatchTimeChart from './charts/WatchTimeChart';
import React, { useEffect, useState } from "react";

interface SelectVideoProps {
  streams: Video[];
  selectedStream: Video|undefined;
  setSelectedStream: any;
  setMetrics: any;
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
        selectedStream && metrics &&
          <WatchTimeChart
            key={key}
            metrics={selectedStream.metrics}
          />
      }
    </div>
  );
}


export default VideoMetrics;