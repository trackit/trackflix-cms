import Ffmpeg from "fluent-ffmpeg";
import libPath from "path"
import {existsSync, mkdirSync} from "fs";

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
        timemarks: ['00:00:05.000'],
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