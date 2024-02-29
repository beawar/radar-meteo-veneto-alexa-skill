"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayWeatherReportIntentHandler = void 0;
const ask_sdk_core_1 = require("ask-sdk-core");
const constants_1 = require("../../constants");
const utils_1 = require("../../model/audio/utils");
const audio_player_1 = require("../../view/audio-player");
exports.PlayWeatherReportIntentHandler = {
    canHandle(handlerInput) {
        return (0, ask_sdk_core_1.getRequestType)(handlerInput.requestEnvelope) === 'IntentRequest'
            && (0, ask_sdk_core_1.getIntentName)(handlerInput.requestEnvelope) === 'PlayWeatherReportIntent';
    },
    handle(handlerInput) {
        // assign as default weather report the basic audio. It retrieve an mp3 file audio with the info of 
        // the today weather
        const reportType = constants_1.BASIC_AUDIO_WEATHER_REPORT;
        // check if the request contains any slot about the weather report intent for detailed information
        /*const slotValue = Alexa.getSlotValue(handlerInput.requestEnvelope, 'dettagliato');
        if(slotValue !== null){
            // use AudioPlayer directive for retrieve mp3 file audio with detailed weather report
            reportType = constants.DetailedAudioWeatherReport;
        }*/
        const audioData = {
            audioSources: [(0, utils_1.buildAudioUrl)(reportType.src)],
            headerTitle: handlerInput.t('REPORT_TITLE'),
            primaryText: reportType.title,
            secondaryText: new Date().toLocaleDateString(handlerInput.getLocale(), { day: 'numeric', month: 'long', year: 'numeric' })
        };
        (0, audio_player_1.buildAudioPlayer)(handlerInput, audioData);
        return handlerInput.responseBuilder.getResponse();
    }
};
