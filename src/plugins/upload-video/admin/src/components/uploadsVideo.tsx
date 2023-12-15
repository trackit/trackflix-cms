import React, { CSSProperties, useEffect, useState } from 'react';
import {TextInput, Typography  } from '@strapi/design-system';
import styled, { DefaultTheme, WebTarget } from 'styled-components';
import { getFetchClient, useCMEditViewDataManager } from '@strapi/helper-plugin';
import { Theme } from './types';
import { readFile } from './readFile';

type fetchClientFunction = (url: string, data?: Object, config?: Object) => any

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

const showProgress = (data: ProgressEvent<FileReader>) => {
  const progress = (data.loaded / data.total) * 100;
  console.log(data.loaded, data.total, progress);
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

const UploadVideo = ( props : customFieldProps ) => {
  const { onChange, value } = props;
  const [videoUrl, setVideoUrl] = useState(value ? value : "");
  const [isUrlInputDisabled, setUrlInputDisabled] = useState(Boolean(value));
  const {get, post} : {get: any, post: fetchClientFunction} = getFetchClient();

  const { modifiedData } = useCMEditViewDataManager();


  useEffect(() => {
  }, [modifiedData])

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
    console.log("loaded, starting blob creation")
    const videoBlob = new Blob([e.target!.result!], { type: file.type });
    console.log("blob created, uploading")
    uploadAsset({
      rawFile: videoBlob,
      caption: file.name,
      name: file.name,
      alternativeText: file.name
    })
    .then((response: any) => {
      console.log(response)
      return response.data[0].url
    })
    .then((url: string) => {
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
      const file = e.target.files[0];
      reader.onprogress = showProgress;
      reader.onload = (e) => {
        uploadFile(e, file);
      }
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
