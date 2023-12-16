import React, { CSSProperties, useEffect, useMemo, useState } from 'react';
import {TextInput, Typography, Box } from '@strapi/design-system';
import styled, { DefaultTheme, WebTarget, keyframes } from 'styled-components';
import { Loader } from '@strapi/icons';
import { getFetchClient, useCMEditViewDataManager } from '@strapi/helper-plugin';
import { Theme } from './types';
import style from './style';

interface OnchangeTarget {
  name: string;
  value: string;
  type: string
}

interface UploadData {
  rawFile: Blob;
  caption: string;
  name: string;
  alternativeText: string;
}

interface customFieldProps {
  onChange: ( {target} : {target : OnchangeTarget} , shouldSetInitialValue? : boolean) => any;
  value: string;
  name: string;
}

enum UploadStatus {
  IDLE,
  READING,
  UPLOADING,
}

const cursors = {
  [UploadStatus.IDLE]: "pointer",
  [UploadStatus.READING]: "progress",
  [UploadStatus.UPLOADING]: "progress",
}

const UploadFileButton = styled.label<{uploadStatus: UploadStatus}>`
    cursor: ${({uploadStatus}) => cursors[uploadStatus]};
    position: relative;
    border: ${({ theme }) => `1px solid ${(theme as Theme).colors.neutral200}`}};
    text-align: center;
    width: max-content;
    color: ${({theme}) => theme.colors.neutral800};
    padding: 15px;
    padding-left: 20px;
    padding-right: 20px;
    border-radius: 10px;
    ${(props) => props.uploadStatus == UploadStatus.IDLE ? `
    &:hover {
      transform: scale(1.01)
    }
    &:active {
      transform: scale(0.99)
    }
    ` : ""
    }
  `

const ProgressBarContainer = styled.div`
  height: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  background-color: ${({theme}) => theme.colors.neutral600};
  border-radius: 10px;
`

const ProgressBar = styled.div<{progress: number}>`
  height: 100%;
  width: ${(props) => props.progress}%;
  background-color: ${({theme}) => theme.colors.primary600};
  border-radius: 10px;
  animation: progress 2s linear infinite;
`

const rotation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
`;

const LoaderAnimated = styled(Loader)`
  fill: ${({theme}) => theme.colors.neutral800};
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  margin: 0;
  padding: 0;
  margin-left: -10px;
  animation: ${rotation} 2s infinite linear;
  will-change: transform;
  & > * {
    fill: ${({theme}) => theme.colors.neutral800};
  }
`;

const useThreeDots = () => {
  const [dots, setDots] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((dots) => (dots + 1) % 4);
    }, 500);
    return () => clearInterval(interval);
  }, []);
  return Array(dots).fill(".").join("");
};



const UploadVideo = ( props : customFieldProps ) => {
  const { onChange, value } = props;
  const [uploadStatus, setUploadStatus] = useState(UploadStatus.IDLE);
  const [videoUrl, setVideoUrl] = useState(value ? value : "");
  const [progress, setProgress] = useState(0);
  const dots = useThreeDots();
  const placeholder = useMemo(() => {
    if (uploadStatus === UploadStatus.READING) {
      return "Reading your video file" + dots;
    }
    if (uploadStatus === UploadStatus.UPLOADING) {
      return "Uploading video to storage" + dots;
    }
    return "URL to your VOD file...";
  }, [uploadStatus, dots]);
  const {get, post} = getFetchClient();

  const uploadAsset = ({rawFile, caption, name, alternativeText}: UploadData) => {
    const formData = new FormData();
    formData.append("files", rawFile);
    formData.append(
      'fileInfo',
      JSON.stringify({
        name,
        caption,
        alternativeText,
        folder: 1,
      })
    );
      
    return post(`/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    })
  };

  const uploadFile = async (e: ProgressEvent<FileReader>, file: File) => {
    const videoBlob = new Blob([e.target!.result!], { type: file.type });
    setUploadStatus(UploadStatus.UPLOADING);
    uploadAsset({
      rawFile: videoBlob,
      caption: file.name,
      name: file.name,
      alternativeText: file.name
    })
    .then((response: any) => response.data[0].url)
    .then((url: string) => {
      onChange({
        target: {
          name: props.name,
          type: "string",
          value: url
        }
      })
      setVideoUrl(url);
      setUploadStatus(UploadStatus.IDLE);
    })
  }
  const onFileUpload : React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!e.target.files)
      return;
    const reader = new FileReader();
    const file = e.target.files[0];
    setUploadStatus(UploadStatus.READING);
    reader.onprogress = (data) => setProgress((data.loaded / data.total) * 100);;
    reader.onload = (e) => uploadFile(e, file);
    reader.readAsArrayBuffer(file);
  }

  return (
    <div style={style.container}>
        <TextInput disabled={uploadStatus != UploadStatus.IDLE} label="VOD URL" placeholder={placeholder} value={videoUrl} onChange={(e: any) => setVideoUrl(e.target.value)} />
        <Typography style={style.or} as="h2">
            or
        </Typography>
        <div style={style.uploadFileContainer}>
          <UploadFileButton uploadStatus={uploadStatus}>
            <input disabled={uploadStatus != UploadStatus.IDLE} type="file" onChange={(e) => onFileUpload(e)} style={{display: 'none'}}/>
            {
              uploadStatus == UploadStatus.READING &&
              <ProgressBarContainer>
                <ProgressBar progress={progress}/>
              </ProgressBarContainer>
            }
            <span style={{visibility: uploadStatus == UploadStatus.IDLE ? "visible" : "hidden"}}>Choose a VOD file</span>
            <LoaderAnimated style={{visibility: uploadStatus == UploadStatus.UPLOADING ? "visible" : "hidden"}}/>
          </UploadFileButton>
        </div>
    </div>
  );
};

export default UploadVideo;
