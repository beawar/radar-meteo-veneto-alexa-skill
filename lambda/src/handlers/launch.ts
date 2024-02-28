import { RequestHandler, getRequestType } from "ask-sdk-core";
import { PLAY_BEHAVIOR } from "../constants";

export const LaunchRequestHandler: RequestHandler = {
    canHandle(handlerInput) {
        return getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = handlerInput.t('WELCOME_MSG');

        return handlerInput.responseBuilder
            .speak(speakOutput, PLAY_BEHAVIOR.replaceAll)
            .reprompt(speakOutput)
            .getResponse();
    }
};