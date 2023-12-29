import Ffmpeg from "fluent-ffmpeg";
import libPath from "path"
import {existsSync, mkdirSync} from "fs";


//https://trackflix-thumbnail-storage-test.s3.us-west-2.amazonaws.com/AWS_Rekognition_and_Deep_Fashion2_The_Future_of_Fashion_Classification_4b293659dc.mp4

const captureRandomFrame = (data : {media_url: string, name: string}) => {
  const {media_url, name} = data;
  const fileName = media_url.split("/").pop().split(".")[0];
  const dirPath = libPath.join(__dirname, `../../../public/uploads/thumbnails`)
  const filePath = libPath.join(dirPath, `${fileName}.jpg`);
  if (!existsSync(dirPath))
    mkdirSync(dirPath, {recursive: true});
  return new Promise<string>((resolve, reject) => {
    Ffmpeg()
      .input(media_url)
      .output(filePath)
      .screenshots({
        count: 1,
        timemarks: ['0'],
        folder: dirPath,
      })
      .on('end', () => {
        resolve(filePath);
      })
      .on('error', (err) => {
        if (existsSync(filePath))
          resolve(filePath);
        else
          reject(err);
      })
      .run();
  });
};

export default captureRandomFrame;