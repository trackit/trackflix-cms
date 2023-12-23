import captureRandomFrame from "./captureRandomFrame";
import {readFileSync} from "fs";

export const addDefaultThumbnailBeforeCreate = async (strapi: any) => {
    const uploadService = strapi.services["plugin::upload.upload"];
    strapi.db.lifecycles.subscribe({
    models: ["api::vod.vod"],
    async beforeCreate(event) {
      const { data } = event.params;
      if (data["Thumbnails"])
        return;
      const firstFramePath = await captureRandomFrame(data)
      const file = {data: readFileSync(firstFramePath), name: 'thumbnail.jpg', type: 'image/jpeg', path: firstFramePath};
      const fileInfo = {
        name: 'thumbnail.jpg', // Replace with your desired file name
        folder: 1,
      }
      const thumbnailObject = await uploadService.upload({ data: { fileInfo }, files: file });
      data["Thumbnails"] = thumbnailObject;
    },
  });
}
