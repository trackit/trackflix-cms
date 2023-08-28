import { Combobox, ComboboxOption } from '@strapi/design-system';
import { Video } from '../../interfaces';
import draft from './charts/draft.json';
import React, { useState } from "react";

interface SelectVideoProps {
  streams: Video[];
  selectedStream: Video|undefined;
  setSelectedStream: any;
}

const SelectVideo = (props: SelectVideoProps) => {
  return (
    <Combobox
      label="Select a video"
      placeholder="Select a video"
      value={props.selectedStream}
      onChange={props.setSelectedStream}
      options={props.streams.map((stream: Video) => ({
        value: stream.id,
        label: stream.name,
      }))}
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
  const [selectedStream, setSelectedStream] = useState<Video|undefined>();

  return (
    <div style={{ padding: '1rem' }}>
      <SelectVideo
        streams={draft['videos-list']}
        selectedStream={selectedStream}
        setSelectedStream={setSelectedStream}
      />
    </div>
  );
}

export default VideoMetrics;