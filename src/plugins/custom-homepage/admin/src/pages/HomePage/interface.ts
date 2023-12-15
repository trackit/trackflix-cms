export interface Video {
    id: number;
    Name: string;
    rotation_start: null | any;
    rotation_end: null | any;
    description: string;
    createdAt: string;
    updatedAt: string;
    media_url: string;
    highlighted: null | any;
    "genre-category-relation": null | any;
    views: string;
    genre: string;
    category: string;
    Thumbnails: Thumbnail[];
  }
  
export interface Thumbnail {
    id: number;
    name: string;
    alternativeText: null | any;
    caption: null | any;
    width: number;
    height: number;
    formats: {
      large: ImageFormat;
      small: ImageFormat;
      medium: ImageFormat;
      thumbnail: ImageFormat;
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: null | any;
    provider: string;
    provider_metadata: null | any;
    folderPath: string;
    createdAt: string;
    updatedAt: string;
  }
  
export interface ImageFormat {
    ext: string;
    url: string;
    hash: string;
    mime: string;
    name: string;
    path: null | any;
    size: number;
    width: number;
    height: number;
  }
  
export interface LiveChannel {
    id: number;
    name: string;
    input_type: string;
    output_type: string;
    Live_to_vod: boolean;
    catch_up: boolean;
    genre: string;
    category: string;
    createdAt: string;
    updatedAt: string;
    genre_category_relation: null | any;
    thumbnail: Thumbnail;
  }

export interface User {
  id: number;
  firstname: string;
  lastname: string;
  username: string | null;
  email: string;
  password: string;
  resetPasswordToken: string | null;
  registrationToken: string | null;
  isActive: boolean;
  blocked: boolean;
  preferedLanguage: string | null;
  createdAt: string;
  updatedAt: string;
  roles: UserRole[];
}

interface UserRole {
  id: number;
  name: string;
  code: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}
  