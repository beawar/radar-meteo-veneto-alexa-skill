"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelpIntentHandler = void 0;
const ask_sdk_core_1 = require("ask-sdk-core");
const constants_1 = require("../../constants");
exports.HelpIntentHandler = {
    canHandle(handlerInput) {
        return (0, ask_sdk_core_1.getRequestType)(handlerInput.requestEnvelope) === 'IntentRequest'
            && (0, ask_sdk_core_1.getIntentName)(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speechText = handlerInput.t('HELP_MSG');
        return handlerInput.responseBuilder
            .speak(speechText, constants_1.PLAY_BEHAVIOR.replaceAll)
            .reprompt(speechText)
            .getResponse();
    }
};
