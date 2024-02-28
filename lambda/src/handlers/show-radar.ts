import { RequestHandler, getIntentName, getRequestType } from "ask-sdk-core";
import { PLAY_BEHAVIOR } from "../constants";
import { fetchRadar } from "../model/radar/utils";
import { buildRadarPlayer } from "../view/radar-player";

export const ShowRadarIntentHandler: RequestHandler = {
    canHandle(handlerInput) {
        return getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && getIntentName(handlerInput.requestEnvelope) === 'ShowRadarIntent';
    },
    handle(handlerInput) {
        // get the src of radar images as an array
        const imagesSrc = fetchRadar();
        buildRadarPlayer(handlerInput, imagesSrc);

        return handlerInput.responseBuilder
            .speak(`${handlerInput.t('POSITIVE_SOUND')}<break time="8s"/>${handlerInput.t('REPROMPT_MSG')}`, PLAY_BEHAVIOR.replaceAll)
            .getResponse();
    }
};