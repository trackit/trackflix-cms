import React, { CSSProperties, useEffect, useState } from 'react';
import { FormData } from 'formdata-node';
import {TextInput, Typography  } from '@strapi/design-system';
import styled, { DefaultTheme, WebTarget } from 'styled-components';
import { getFetchClient, useCMEditViewDataManager, useStrapiApp } from '@strapi/helper-plugin';
import pluginId from '../pluginId';
import { Theme } from './types';


type fetchClientFunction = (url: string, data?: Object, config?: Object) => any

interface OnchangeTarget {
  name: string;
  value: string;
  type: string
}

interface customFieldProps {
  onChange: ( {target} : {target : OnchangeTarget} , shouldSetInitialValue? : boolean) => any;
  value: string
}

const containerStyle : CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
}

const uploadFileStyle: CSSProperties = {
    cursor: "pointer",
    border: "1px solid black",
    textAlign: "center",
    width: "max-content",
    padding: 15,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 10,
}

const UploadFileButton = styled.label`
  cursor: pointer;

  border: ${({ theme }) => `1px solid ${(theme as Theme).colors.neutral200}`}};
  text-align: center;
  width: max-content;
  color: ${({theme}) => theme.colors.neutral800};
  padding: 15px;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 10px;
  &:hover {
    transform: scale(1.01)
  }
  &:active {
    transform: scale(0.99)
  }
`


const uploadFileContainerStyle : CSSProperties = {
  width: "100%",
  display: 'flex',
  flexDirection: "row",
  justifyContent: "center",
}

const orStyle: CSSProperties = {
    width: "100%",
    textAlign: "center"
  }

const UploadVideo = ( {onChange, value} : customFieldProps ) => {

  const [videoUrl, setVideoUrl] = useState(value ? value : "");
  const [isUrlInputDisabled, setUrlInputDisabled] = useState(Boolean(value));
  const {get, post} : {get: any, post: fetchClientFunction} = getFetchClient();

  console.log(value)

  const uploadAsset = (blobfile: any) => {
    const { rawFile, caption, name, alternativeText } = {
      rawFile: blobfile, caption: "test", name: "ok", alternativeText: "test"
    }
    const formData = new FormData();
  
    formData.append('files', rawFile);
  
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
    uploadAsset(videoBlob).then((response: any) => {console.log(response); return response.data[0].url}).then((url: string) => {
      onChange({
        target: {
          name: "test_upload",
          type: "text",
          value: url
        }
      })
      setVideoUrl(url);
      setUrlInputDisabled(true)
    })
  }

  const onFileUpload : React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.files) {
      const reader = new FileReader();
      const file = e.target.files[0]
      reader.onload = (e) => uploadFile(e, file)
      reader.readAsArrayBuffer(file);
    }
  }

  return (
    <div style={containerStyle}>
        <TextInput disabled={isUrlInputDisabled} label="VOD URL" placeholder="URL to your VOD file..." value={videoUrl} onChange={(e: any) => setVideoUrl(e.target.value)} />
        <Typography style={orStyle} as="h2">
            or
        </Typography>
        <div style={uploadFileContainerStyle}>
          <UploadFileButton>
          <input type="file" onChange={(e) => onFileUpload(e)} style={{display: 'none'}}/>
              Choose a VOD file
          </UploadFileButton>
        </div>
    </div>
  );
};

export default UploadVideo;
