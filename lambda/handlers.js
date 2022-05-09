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
            .speak(speakOutput)
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
            .speak(speechText)
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
        // try {
        //     // call the progressive response service
        //     util.callDirectiveService(handlerInput, handlerInput.t('PROGRESSIVE_MSG'));
        // } catch (error) {
        //     // if it fails we can continue, but the user will wait without progressive response
        //     console.log("Progressive response directive error : " + error);
        // }
        // we'll now fetch radar images from an external API
        // const response = await logic.fetchRadar();
        const imagesSrc = logic.fetchRadar();
        // let speechText = handlerInput.t('API_ERROR_MSG');
        // if (response && !Array.isArray(response)) {
        //     speechText = 'Fetch error: ' + response.message;
        // } else if (response) {
        //     speechText = handlerInput.t('POSITIVE_SOUND');
        // }
        
        
        console.log('calling show images');
        
        view.showImages(handlerInput, imagesSrc);

        return handlerInput.responseBuilder
            .speak(handlerInput.t('OPEN_PLAYER_MSG', 'Sto aprendo il player'))
            .speak(handlerInput.t('POSITIVE_SOUND'))
            .reprompt(handlerInput.t('REPROMPT_MSG'))
            .getResponse();
    }
};

const ReadWheaterReportIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ReadWheaterReportIntent';
    },
    handle(handlerInput) {
        let speechText = 'Non implementata';
        
        return handlerInput.responseBuilder
            .speak(speechText)
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