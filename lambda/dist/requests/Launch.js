"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LaunchRequestHandler = void 0;
const ask_sdk_core_1 = require("ask-sdk-core");
const constants_1 = require("../constants");
exports.LaunchRequestHandler = {
    canHandle(handlerInput) {
        return (0, ask_sdk_core_1.getRequestType)(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = handlerInput.t('WELCOME_MSG');
        return handlerInput.responseBuilder
            .speak(speakOutput, constants_1.PLAY_BEHAVIOR.replaceAll)
            .reprompt(speakOutput)
            .getResponse();
    }
};
//# sourceMappingURL=Launch.js.map