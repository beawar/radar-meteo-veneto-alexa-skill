import { RequestHandler, getIntentName, getRequestType } from "ask-sdk-core";

/**
 * Intent handler to start playing an audio file.
 * By default, it will play a specific audio stream.
 * */
export const PauseAudioIntentHandler: RequestHandler = {
    canHandle(handlerInput) {
        return getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && getIntentName(handlerInput.requestEnvelope) === 'AMAZON.PauseIntent';
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .addAudioPlayerStopDirective()
            .getResponse();
    }
};