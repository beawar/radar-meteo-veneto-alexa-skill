"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildAudioUrl = void 0;
function buildAudioUrl(src) {
    return src + `?${new Date().getTime()}`;
}
exports.buildAudioUrl = buildAudioUrl;
//# sourceMappingURL=utils.js.map