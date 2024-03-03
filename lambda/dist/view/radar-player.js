"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildRadarPlayer = void 0;
const constants_1 = require("../constants");
const utils_1 = require("./utils");
function buildRadarPlayer(handlerInput, images) {
    // Add APL directive to response
    if ((0, utils_1.supportsAPL)(handlerInput)) {
        const imagesUrl = images.map((imageSrc) => ({
            url: imageSrc,
        }));
        handlerInput.responseBuilder.addDirective((0, utils_1.buildDirective)(constants_1.APL.radarPlayer, {
            radarImagesData: {
                type: "object",
                properties: {
                    images: imagesUrl,
                },
            },
        }));
    }
    else {
        handlerInput.responseBuilder.speak(handlerInput.t("UNSUPPORTED_DEVICE_MSG"));
    }
}
exports.buildRadarPlayer = buildRadarPlayer;
//# sourceMappingURL=radar-player.js.map