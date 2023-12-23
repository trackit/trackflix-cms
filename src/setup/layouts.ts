import VODLayout from "./layouts/VOD.json"
import LiveChannelLayout from "./layouts/LiveChannel.json"

export const setVODLayout = (strapi) => {
    const contentTypeService = strapi.services["plugin::content-manager.content-types"];
    const contentType = contentTypeService.findContentType("api::vod.vod");
    const defaultConfig = contentTypeService.findConfiguration(contentType);
    contentTypeService.updateConfiguration(contentType, {...defaultConfig, layouts: VODLayout.layouts});
}

export const setLiveChannelLayout = (strapi) => {
    const contentTypeService = strapi.services["plugin::content-manager.content-types"];
    const contentType = contentTypeService.findContentType("api::live-channel.live-channel");
    const defaultConfig = contentTypeService.findConfiguration(contentType);
    contentTypeService.updateConfiguration(contentType, {...defaultConfig, layouts: LiveChannelLayout.layouts});
}



