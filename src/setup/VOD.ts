import VODLayout from "./layouts/VOD.json"

export const setVODLayout = (strapi) => {
    const contentTypeService = strapi.services["plugin::content-manager.content-types"];
    const contentType = contentTypeService.findContentType("api::vod.vod");
    const defaultConfig = contentTypeService.findConfiguration(contentType);
    contentTypeService.updateConfiguration(contentType, {...defaultConfig, layouts: VODLayout.layouts});
}

