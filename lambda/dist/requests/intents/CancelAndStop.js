"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CancelAndStopIntentHandler = void 0;
const ask_sdk_core_1 = require("ask-sdk-core");
exports.CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return (0, ask_sdk_core_1.getRequestType)(handlerInput.requestEnvelope) === 'IntentRequest'
            && ((0, ask_sdk_core_1.getIntentName)(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || (0, ask_sdk_core_1.getIntentName)(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speechText = handlerInput.t('GOODBYE_MSG', { name: '' });
        return handlerInput.responseBuilder
            .speak(speechText)
            .withShouldEndSession(true) // session can remain open if APL doc was rendered
            .getResponse();
    }
};
