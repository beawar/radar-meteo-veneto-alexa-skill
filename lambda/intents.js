const Alexa = require('ask-sdk-core');
const util = require('./util'); // utility functions
const interceptors = require('./interceptors');
const logic = require('./logic'); // this file encapsulates all "business" logic

const ShowRadarIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ShowRadarIntent';
    },
    async handle(handlerInput) {
        try {
            // call the progressive response service
            util.callDirectiveService(handlerInput, handlerInput.t('PROGRESSIVE_MSG'));
        } catch (error) {
            // if it fails we can continue, but the user will wait without progressive response
            console.log("Progressive response directive error : " + error);
        }
        // we'll now fetch radar images from an external API
        const response = await logic.fetchRadar(handlerInput);
        // const response = await new Promise((resolve) => {
            // setTimeout(resolve(['data']), 2000);
        // })
        console.log(JSON.stringify(response));
        // // below we convert the API response to text that Alexa can read
        // const speechResponse = logic.convertBirthdaysResponse(handlerInput, response, true, timezone);
        let speechText = handlerInput.t('API_ERROR_MSG');
        if (response && !Array.isArray(response)) {
            speechText = 'Fetch error' + response.message;
        } else if (response) {
            speechText = 'Fetch immagini completato con successo';
        }

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(handlerInput.t('REPROMPT_MSG'))
            .getResponse();
    }
};

const ReadWheaterReportIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ReadWheaterReportIntent';
    },
    async handle(handlerInput) {
        let speechText = 'Non implementata';
        
        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(handlerInput.t('REPROMPT_MSG'))
            .getResponse();
    }
};

module.export = { ShowRadarIntentHandler, ReadWheaterReportIntentHandler };
