"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ strapi }) => {
    strapi.customFields.register({
        inputSize: {
            default: 4,
            isResizable: true,
        },
        name: 'genre-category',
        plugin: 'custom-selects',
        type: 'string',
    });
};
