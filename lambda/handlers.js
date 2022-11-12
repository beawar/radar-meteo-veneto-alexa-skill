const Alexa = require('ask-sdk-core');
const util = require('./util'); // utility functions
const interceptors = require('./interceptors');
const logic = require('./logic'); // this file encapsulates all "business" logic
const view = require('./view');
const constants = require('./constants');


const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = handlerInput.t('WELCOME_MSG');

        return handlerInput.responseBuilder
            .speak(speakOutput, constants.PlayBehavior.REPLACE_ALL)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speechText = handlerInput.t('HELP_MSG');

        return handlerInput.responseBuilder
            .speak(speechText, constants.PlayBehavior.REPLACE_ALL)
            .reprompt(speechText)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speechText = handlerInput.t('GOODBYE_MSG', {name: ''});

        return handlerInput.responseBuilder
            .speak(speechText)
            .withShouldEndSession(true) // session can remain open if APL doc was rendered
            .getResponse();
    }
};

/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speechText = handlerInput.t('FALLBACK_MSG');

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(handlerInput.t('REPROMPT_MSG'))
            .getResponse();
    }
};

/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speechText = handlerInput.t('REFLECTOR_MSG', {intent: intentName});

        return handlerInput.responseBuilder
            .speak(speechText)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speechText = handlerInput.t('ERROR_MSG');
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(handlerInput.t('REPROMPT_MSG'))
            .getResponse();
    }
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        if(null !== handlerInput.requestEnvelope.request.error && undefined !== handlerInput.requestEnvelope.request.error) {
            console.log(JSON.stringify(handlerInput.requestEnvelope.request.error));
        }


        return handlerInput.responseBuilder.getResponse();
    },
};


/**
 * CUSTOM HANDLERS
 **/

const ShowRadarIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ShowRadarIntent';
    },
    handle(handlerInput) {
        // get the src of radar images as an array
        const imagesSrc = logic.fetchRadar();
        view.buildRadarPlayer(handlerInput, imagesSrc);

        return handlerInput.responseBuilder
            .speak(`${handlerInput.t('POSITIVE_SOUND')}<break time="8s"/>${handlerInput.t('REPROMPT_MSG')}`, constants.PlayBehavior.REPLACE_ALL)
            .getResponse();
    }
};

const ReadWeatherReportIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ReadWeatherReportIntent';
    },
    async handle(handlerInput) {
        // TODO:
        //   PART 1: Alexa reading the summary report
        //   1) retrieve xml from https://www.arpa.veneto.it/previsioni/it/xml/bollettino_utenti.xml (tag bollettini)
        //   2) cleanup text to remove html tags
        //   3) improve text to replace slashes with dash
        //   PART 2:
        //   1) retrieve mp3 of detailed report from https://www.arpa.veneto.it/previsioni/audio/meteoveneto.mp3
        //   2) make alexa speak mp3
        //   3) [optional] display detailed report text on device (where supported)
        //   PART 3:
        //   1) Retrieve report images from https://www.arpa.veneto.it/previsioni/it/xml/bollettino_utenti.xml (tag bollettini)
        //   2) Show images on devices with display
        
        try {
            // call the progressive response service
            util.callDirectiveService(handlerInput, handlerInput.t('PROGRESSIVE_MSG'));
        } catch (error) {
            // if it fails we can continue, but the user will wait without progressive response
            console.log("Progressive response directive error : " + error);
        }

        const reportSpeech = await logic.fetchReport()
        .then((report) => logic.parseReportXmlToObj(report, handlerInput))
        .then((reportObj) => {
            const bollettinoVeneto = logic.findReportEntry(reportObj, constants.REPORT_ENTRY.VENETO);
            view.buildReportViewer(handlerInput, bollettinoVeneto);
            return logic.parseReportObjToSpeech(report, bollettinoVeneto)
        });
              
        

        return handlerInput.responseBuilder
            .speak(reportSpeech, constants.PlayBehavior.REPLACE_ALL)
            .reprompt(handlerInput.t('REPROMPT_MSG'))
            .getResponse();
    }
};

const PlayWeatherReportIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'PlayWeatherReportIntent';
    },
    handle(handlerInput) {
        
        // assign as default weather report the basic audio. It retrieve an mp3 file audio with the info of 
        // the today weather
        const reportType = constants.BasicAudioWeatherReport;
        
        // check if the request contains any slot about the weather report intent for detailed information
        /*const slotValue = Alexa.getSlotValue(handlerInput.requestEnvelope, 'dettagliato');        
        if(slotValue !== null){
            // use AudioPlayer directive for retrieve mp3 file audio with detailed weather report
            reportType = constants.DetailedAudioWeatherReport;
        }*/

        return handlerInput.responseBuilder
            .speak('${reportType.metadata.title}')
            .addAudioPlayerPlayDirective(
                constants.PlayBehavior.REPLACE_ALL, 
                reportType.audioItem.stream.url, 
                reportType.audioItem.stream.token, 
                reportType.audioItem.stream.offsetInMilliseconds)
            /*.addAudioPlayerPlayDirective(
                constants.PlayBehavior.REPLACE_ALL,
                urlMp3,
                '',
                0
                )*/
            .getResponse();
    }
};

/**
 * Intent handler to start playing an audio file.
 * By default, it will play a specific audio stream.
 * */
const PauseAudioIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.PauseIntent';
    },
    async handle(handlerInput) {
        return handlerInput.responseBuilder
            .addAudioPlayerStopDirective()
            .getResponse();
    }
};

module.exports = { 
    LaunchRequestHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    IntentReflectorHandler,
    FallbackIntentHandler,
    ErrorHandler,
    SessionEndedRequestHandler,
    // custom handlers
    ShowRadarIntentHandler,
    ReadWeatherReportIntentHandler,
    PlayWeatherReportIntentHandler,
    PauseAudioIntentHandler
};