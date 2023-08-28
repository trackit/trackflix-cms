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
}