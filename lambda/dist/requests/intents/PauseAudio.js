"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PauseAudioIntentHandler = void 0;
const ask_sdk_core_1 = require("ask-sdk-core");
/**
 * Intent handler to start playing an audio file.
 * By default, it will play a specific audio stream.
 * */
exports.PauseAudioIntentHandler = {
    canHandle(handlerInput) {
        return (0, ask_sdk_core_1.getRequestType)(handlerInput.requestEnvelope) === 'IntentRequest'
            && (0, ask_sdk_core_1.getIntentName)(handlerInput.requestEnvelope) === 'AMAZON.PauseIntent';
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .addAudioPlayerStopDirective()
            .getResponse();
    }
};
