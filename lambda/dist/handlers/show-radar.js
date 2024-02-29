"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShowRadarIntentHandler = void 0;
const ask_sdk_core_1 = require("ask-sdk-core");
const constants_1 = require("../constants");
const utils_1 = require("../model/radar/utils");
const radar_player_1 = require("../view/radar-player");
exports.ShowRadarIntentHandler = {
    canHandle(handlerInput) {
        return (0, ask_sdk_core_1.getRequestType)(handlerInput.requestEnvelope) === 'IntentRequest'
            && (0, ask_sdk_core_1.getIntentName)(handlerInput.requestEnvelope) === 'ShowRadarIntent';
    },
    handle(handlerInput) {
        // get the src of radar images as an array
        const imagesSrc = (0, utils_1.buildRadarUrls)();
        (0, radar_player_1.buildRadarPlayer)(handlerInput, imagesSrc);
        return handlerInput.responseBuilder
            .speak(`${handlerInput.t('POSITIVE_SOUND')}<break time="8s"/>${handlerInput.t('REPROMPT_MSG')}`, constants_1.PLAY_BEHAVIOR.replaceAll)
            .getResponse();
    }
};
