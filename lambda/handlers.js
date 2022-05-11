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
        // get the src of radar images as an array
        const imagesSrc = logic.fetchRadar();
        view.showImages(handlerInput, imagesSrc);

        return handlerInput.responseBuilder
            .speak(`${handlerInput.t('POSITIVE_SOUND')}<break time="8s"/>${handlerInput.t('REPROMPT_MSG')}`)
            .getResponse();
    }
};

const ReadWheaterReportIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ReadWheaterReportIntent';
    },
    handle(handlerInput) {
        let speechText = `
<emphasis level="strong">Evoluzione generale</emphasis>

<p>
    L'Anticiclone Subtropicale Africano continuerà a portare temperature sopra la media specie nelle ore diurne,
    tra venerdì e sabato sarà meno esteso verso le nostre latitudini e si verificheranno delle piogge per effetto di contrasti con aria di origine atlantica,
    da domenica si riavvicinerà.
</p>

<emphasis level="strong">Il tempo oggi</emphasis>

<p>
    <emphasis level="strong">mercoledì 11</emphasis>
    Previsioni per il pomeriggio/sera di oggi. 
    Cielo in prevalenza sereno o poco nuvoloso, su rilievi e zone limitrofe di pomeriggio a tratti parzialmente nuvoloso o nuvoloso con qualche piovasco sui monti.
    Temperature in aumento leggero/moderato rispetto a martedì e sopra la media, anche di molto specie di pomeriggio.
</p>

<emphasis level="strong">Tempo previsto</emphasis>

<p>
    <emphasis level="strong">giovedì 12</emphasis>.
    Cielo in prevalenza sereno o poco nuvoloso, su rilievi e zone limitrofe a tratti parzialmente nuvoloso o nuvoloso di pomeriggio.
    Precipitazioni: Sulla pianura assenti, sui monti probabilità bassa (5-25%) per qualche piovasco/rovescio di pomeriggio.
    Temperature: Rispetto a mercoledì saranno in aumento leggero/moderato, eccetto stazionarietà di giorno sulla pianura; valori sopra la media anche di molto.
    Venti Deboli/moderati; sulla costa e in prossimità dei rilievi a regime di brezza, in alta montagna di ovest, altrove con direzione variabile.
    Mare poco mosso.
</p>

<p>
<emphasis level="strong">venerdì 13</emphasis>. 
    Di notte sereno o poco nuvoloso, di mattina poco o parzialmente nuvoloso, tra il pomeriggio nuvolosità in ulteriore aumento fino a cielo anche coperto più probabilmente su rilievi e zone limitrofe.
    Precipitazioni. Tra il pomeriggio e la sera sui monti probabilità medio-alta (50-75%) per piogge diffuse, sulla pedemontana probabilità medio-bassa (25-50%) per piogge sparse e sulle zone limitrofe probabilità bassa (5-25%) per piogge locali; si tratterà di piovaschi/rovesci/temporali. Per il resto assenti.
    Temperature: Rispetto a giovedì fino al mattino saranno senza variazioni di rilievo sulla pianura e in aumento leggero/moderato sui monti, poi più basse anche di molto.
    Venti: Deboli/moderati, in alta montagna da ovest e altrove con direzione variabile.
    Mare Poco mosso fino al mattino e calmo dal pomeriggio.
</p>

<emphasis level="strong">Tendenza</emphasis>

<p>
    <emphasis level="strong">sabato 14</emphasis>.
    Alternanza di nuvole e rasserenamenti con delle piogge a tratti meno probabili su Veneziano e Rodigino e più probabili altrove. 
    Temperature in aumento di notte e in calo di giorno.
    
    <emphasis level="strong">domenica 15</emphasis>.
    Cielo in prevalenza sereno o poco nuvoloso, su rilievi e zone limitrofe di pomeriggio a tratti parzialmente nuvoloso o nuvoloso con qualche piovasco sui monti. 
    Temperature di notte senza variazioni di rilievo sulla pianura e in calo sui monti, di giorno in aumento.
</p>
        `;
        
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