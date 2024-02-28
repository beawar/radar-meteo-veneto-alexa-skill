import { RequestHandler, getIntentName, getRequestType } from "ask-sdk-core";
import { BASIC_AUDIO_WEATHER_REPORT } from "../constants";
import { buildAudioUrl } from "../model/audio/utils";
import { AudioPlayerData, buildAudioPlayer } from "../view/audio-player";

export const PlayWeatherReportIntentHandler: RequestHandler = {
    canHandle(handlerInput) {
        return getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && getIntentName(handlerInput.requestEnvelope) === 'PlayWeatherReportIntent';
    },
    handle(handlerInput) {

        // assign as default weather report the basic audio. It retrieve an mp3 file audio with the info of 
        // the today weather
        const reportType = BASIC_AUDIO_WEATHER_REPORT;

        // check if the request contains any slot about the weather report intent for detailed information
        /*const slotValue = Alexa.getSlotValue(handlerInput.requestEnvelope, 'dettagliato');        
        if(slotValue !== null){
            // use AudioPlayer directive for retrieve mp3 file audio with detailed weather report
            reportType = constants.DetailedAudioWeatherReport;
        }*/

        const audioData: AudioPlayerData = {
            audioSources: [buildAudioUrl(reportType.src)],
            headerTitle: handlerInput.t('REPORT_TITLE'),
            primaryText: reportType.title,
            secondaryText: new Date().toLocaleDateString(handlerInput.getLocale(), { day: 'numeric', month: 'long', year: 'numeric' })
        };
        buildAudioPlayer(handlerInput, audioData);


        return handlerInput.responseBuilder.getResponse();
    }
};