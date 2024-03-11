"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LastSpeechResponseInterceptor = void 0;
const constants_1 = require("../constants");
function getSpeechText(outputSpeech) {
    if (outputSpeech === undefined) {
        return undefined;
    }
    if (outputSpeech.type === 'SSML') {
        return outputSpeech.ssml;
    }
    return outputSpeech.text;
}
exports.LastSpeechResponseInterceptor = {
    process: (handlerInput, response) => {
        const currentAttributes = handlerInput.attributesManager.getSessionAttributes();
        handlerInput.attributesManager.setSessionAttributes(Object.assign(Object.assign({}, currentAttributes), { [constants_1.LAST_SPEECH_ATTRIBUTE_KEY]: getSpeechText(response === null || response === void 0 ? void 0 : response.outputSpeech) }));
    },
};
//# sourceMappingURL=LastSpeech.js.map