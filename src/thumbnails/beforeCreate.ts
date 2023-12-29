import captureRandomFrame from "./captureRandomFrame";
import {readFileSync, rmSync, existsSync} from "fs";
import path from "path";


const removeTmpFile = (filePath: string) => {
  const dirPath = path.dirname(filePath);
  if (existsSync(filePath))
    rmSync(filePath);
  if (existsSync(path.join(dirPath, "tn.png")))
    rmSync(path.join(dirPath, "tn.png"));
}

export const addDefaultThumbnailBeforeCreate = async (strapi: any) => {
    const uploadService = strapi.services["plugin::upload.upload"];
    strapi.db.lifecycles.subscribe({
    models: ["api::vod.vod"],
    async beforeCreate(event) {
      const { data } = event.params;
      if (data["Thumbnails"])
        return;
      const firstFramePath = await captureRandomFrame(data)
      const fileName = firstFramePath.split("/").pop();
      const file = {data: readFileSync(firstFramePath), name: fileName, type: 'image/jpeg', path: firstFramePath};
      const fileInfo = {
        name: fileName, // Replace with your desired file name
        folder: 1,
      }
      const thumbnailObject = await uploadService.upload({ data: { fileInfo }, files: file });
      removeTmpFile(firstFramePath);
      data["Thumbnails"] = thumbnailObject;
    },
  });
}
