import React, { CSSProperties, useEffect } from 'react';
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { FormData } from 'formdata-node';
import {Readable} from "stream"
import {FormDataEncoder} from "form-data-encoder"
import { SingleSelect, SingleSelectOption, MultiSelect, TextInput, Typography  } from '@strapi/design-system';
import { getFetchClient, useCMEditViewDataManager, useStrapiApp } from '@strapi/helper-plugin';
import pluginId from '../pluginId';
import { any, object, string } from 'prop-types';

const {get, post} : {get: any, post: (url: string, data?: Object, config?: Object) => any} = getFetchClient();

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

const uploadFileContainerStyle : CSSProperties = {
  width: "100%",
  display: 'flex',
  flexDirection: "row",
  justifyContent: "center",
  border: "1px solid blue",
}

const orStyle: CSSProperties = {
    width: "100%",
    textAlign: "center"
  }


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
    }).then((res: any) => console.log(res.data[0].url));
  };

const uploadFile = async (e: ProgressEvent<FileReader>, file: File) => {
  const videoBlob = new Blob([e.target!.result!], { type: file.type });
  uploadAsset(videoBlob)
}

const onFileUpload : React.ChangeEventHandler<HTMLInputElement> = (e) => {
  if (e.target.files) {
    const reader = new FileReader();
    const file = e.target.files[0]
    reader.onload = (e) => uploadFile(e, file)
    reader.readAsArrayBuffer(file);
    
  }
}

const UploadVideo = () => {

  
  const { modifiedData } = useCMEditViewDataManager()
  const strapiApp = useStrapiApp()
  console.log(strapiApp.getPlugin("upload"))

  return (
    <div style={containerStyle}>
        <TextInput label="VOD URL" placeholder="URL to your VOD file..." />
        <Typography style={orStyle} as="h2">
            salam
        </Typography>
        <div style={uploadFileContainerStyle}>
          <label className="custom-file-upload" style={uploadFileStyle}>
              <input type="file" onChange={(e) => onFileUpload(e)} style={{display: 'none'}}/>
              Custom Upload
          </label>
        </div>
    </div>
  );
};

export default UploadVideo;
