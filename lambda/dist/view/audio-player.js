"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildAudioPlayer = void 0;
const constants_1 = require("../constants");
const utils_1 = require("./utils");
const node_assert_1 = __importDefault(require("node:assert"));
function buildAudioPlayer(handlerInput, { audioSources, headerTitle, primaryText, secondaryText, coverImageSrc, logoSrc = constants_1.LOGO_URL }) {
    if (audioSources) {
        (0, node_assert_1.default)(audioSources[0]);
        if ((0, utils_1.supportsAPL)(handlerInput)) {
            handlerInput.responseBuilder.addDirective((0, utils_1.buildDirective)(constants_1.APL.audioPlayer, {
                audioPlayerData: {
                    type: "object",
                    properties: {
                        audioControlType: "jump10",
                        audioSources,
                        backgroundImage: "",
                        coverImageSource: coverImageSrc,
                        headerTitle,
                        logoUrl: logoSrc,
                        primaryText,
                        secondaryText,
                        sliderType: "determinate",
                    },
                },
            }));
        }
        else {
            handlerInput.responseBuilder.addAudioPlayerPlayDirective(constants_1.PLAY_BEHAVIOR.replaceAll, audioSources[0], constants_1.APL.audioPlayer.token, 0, undefined, Object.assign({ title: primaryText, subtitle: secondaryText }, (coverImageSrc && { art: {
                    sources: [{ url: coverImageSrc }],
                } } || {})));
        }
    }
}
exports.buildAudioPlayer = buildAudioPlayer;
//# sourceMappingURL=audio-player.js.map