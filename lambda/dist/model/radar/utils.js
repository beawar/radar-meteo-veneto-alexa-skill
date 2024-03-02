"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildRadarUrls = void 0;
function buildRadarUrls() {
    const requests = [];
    const timestamp = new Date().getTime();
    for (let i = 6; i > 0; i--) {
        const url = `https://www.arpa.veneto.it/bollettini/meteo/radar/imgs/teolo/${i}_BASE.jpg?${timestamp}`;
        requests.push(url);
    }
    return requests;
}
exports.buildRadarUrls = buildRadarUrls;
//# sourceMappingURL=utils.js.map