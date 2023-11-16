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

export interface Theme {
  colors: {
    alternative100: string;
    alternative200: string;
    alternative500: string;
    alternative600: string;
    alternative700: string;
    buttonNeutral0: string;
    buttonPrimary500: string;
    buttonPrimary600: string;
    danger100: string;
    danger200: string;
    danger500: string;
    danger600: string;
    danger700: string;
    neutral0: string;
    neutral100: string;
    neutral1000: string;
    neutral150: string;
    neutral200: string;
    neutral300: string;
    neutral400: string;
    neutral500: string;
    neutral600: string;
    neutral700: string;
    neutral800: string;
    neutral900: string;
    primary100: string;
    primary200: string;
    primary500: string;
    primary600: string;
    primary700: string;
    secondary100: string;
    secondary200: string;
    secondary500: string;
    secondary600: string;
    secondary700: string;
    success100: string;
    success200: string;
    success500: string;
    success600: string;
    success700: string;
    warning100: string;
    warning200: string;
    warning500: string;
    warning600: string;
    warning700: string;
  };
  shadows: {
    filterShadow: string;
    focus: string;
    focusShadow: string;
    popupShadow: string;
    tableShadow: string;
  };
  sizes: {
    input: {
      S: string;
      M: string;
    };
    accordions: {
      S: string;
      M: string;
    };
    badge: {
      S: string;
      M: string;
    };
    button: {
      S: string;
      M: string;
      L: string;
    };
  };
  zIndices: number[];
  spaces: string[];
  borderRadius: string;
  mediaQueries: {
    tablet: string;
    mobile: string;
  };
  fontSizes: string[];
  lineHeights: number[];
  fontWeights: {
    regular: number;
    semiBold: number;
    bold: number;
  };
}
