"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ strapi }) => ({
    async genres(ctx) {
        var _a;
        const req = await ((_a = strapi.service('api::genre.genre')) === null || _a === void 0 ? void 0 : _a.find({
            populate: ['categories']
        }));
        ctx.body = req;
        ctx.status = 200;
    }
});
