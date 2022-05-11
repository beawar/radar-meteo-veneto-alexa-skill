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
        view.showImages(handlerInput, imagesSrc);

        return handlerInput.responseBuilder
            .speak(`${handlerInput.t('POSITIVE_SOUND')}<break time="8s"/>${handlerInput.t('REPROMPT_MSG')}`, constants.PlayBehavior.REPLACE_ALL)
            .getResponse();
    }
};

const ReadWheaterReportIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ReadWheaterReportIntent';
    },
    handle(handlerInput) {
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
        //   2) 
        
        /*
            <bollettino bollettinoid="MV" name="Meteo Veneto" title="Bollettino del 11 maggio">
                <evoluzionegenerale>
                    L'Anticiclone Subtropicale Africano continuer&agrave; a portare temperature sopra la media specie nelle ore diurne, tra venerd&igrave; e sabato sar&agrave; meno esteso verso le nostre latitudini e si verificheranno delle piogge per effetto di contrasti con aria di origine atlantica, da domenica si riavviciner&agrave;.
                </evoluzionegenerale>
                <avviso/>
                <fenomeniparticolari/>
            </bollettino>
        */
        let speechText = `
                <b>Tempo atteso: </b>Di notte sereno o poco nuvoloso, di mattina poco o parzialmente nuvoloso, tra il pomeriggio nuvolosit&agrave; in ulteriore aumento fino a cielo anche coperto pi&ugrave; probabilmente su rilievi e zone limitrofe. <br /><b>Precipitazioni: </b>Tra il pomeriggio e la sera sui monti probabilit&agrave; medio-alta (50-75%) per piogge diffuse, sulla pedemontana probabilit&agrave; medio-bassa (25-50%) per piogge sparse e sulle zone limitrofe probabilit&agrave; bassa (5-25%) per piogge locali; si tratter&agrave; di piovaschi/rovesci/temporali. Per il resto assenti.<br /><b>Temperature: </b>Rispetto a gioved&igrave; fino al mattino saranno senza variazioni di rilievo sulla pianura e in aumento leggero/moderato sui monti, poi pi&ugrave; basse anche di molto.<br /><b>Venti: </b>Deboli/moderati, in alta montagna da ovest e altrove con direzione variabile.<br /><b>Mare: </b>Poco mosso fino al mattino e calmo dal pomeriggio.<br /><b>Attendibilit&agrave;: </b>Buona<br />
        `;
        
        return handlerInput.responseBuilder
            .speak(speechText, constants.PlayBehavior.REPLACE_ALL)
            .reprompt(handlerInput.t('REPROMPT_MSG'))
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
    ReadWheaterReportIntentHandler
};