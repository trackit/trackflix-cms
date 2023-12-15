import { Plugin } from "./type";
const _ = require('lodash');
import { v4, validate } from 'uuid';
import utils from '@strapi/utils'
const { ApplicationError } = require('@strapi/utils').errors;


export default (plugin: Plugin) => {
    const replaceFile = plugin.controllers["admin-upload"].replaceFile;
    const uploadFiles = plugin.controllers["admin-upload"].uploadFiles;
    const updateFileInfo = plugin.controllers["admin-upload"].updateFileInfo;
    plugin.controllers["admin-upload"].upload = async function (ctx) {
      console.log("upload function have been accessed")
      const {
        query: { id },
        request: {
          files: { files = {} } = {},
          uuid: { uuid = {} } = {},
         },
      } = ctx;


      if (_.isEmpty(files) || files.size === 0) {
        if (id) {
          return this.updateFileInfo(ctx);
        }
  
        throw new ApplicationError('Files are empty');
      }
      await (id ? this.replaceFile : this.uploadFiles)(ctx);
      if (uuid) {
        console.log(`file ${uuid} have been uploaded`);
      }
    }.bind(plugin.controllers["admin-upload"]);
    return plugin;
  };