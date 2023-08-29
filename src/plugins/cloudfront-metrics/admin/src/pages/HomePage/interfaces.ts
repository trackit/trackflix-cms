export interface StreamData {
  quality: string;
  timestamp: string;
}

export interface Stream {
  id: string;
  name: string;
  data: StreamData[];
}

export interface Video {
  id: string;
  name: string;
  metrics: any;
  interactions?: Interactions;
}

export interface Interactions {
  likes: number;
  comments: number;
  shares: number;
  minutes: number;
}

export interface WatchedVideo {
  name: string;
  value: number;
}

export interface User {
  id: string;
  "watched-categories": WatchedVideo[];
}
