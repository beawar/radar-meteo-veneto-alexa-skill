function callDirectiveService(handlerInput, msg) {
    // Call Alexa Directive Service.
    const {requestEnvelope} = handlerInput;
    const directiveServiceClient = handlerInput.serviceClientFactory.getDirectiveServiceClient();
    const requestId = requestEnvelope.request.requestId;
    const {apiEndpoint, apiAccessToken} = requestEnvelope.context.System;
    // build the progressive response directive
    const directive = {
        header: {
            requestId
        },
        directive:{
            type: 'VoicePlayer.Speak',
            speech: msg
        }
    };
    // send directive
    return directiveServiceClient.enqueue(directive, apiEndpoint, apiAccessToken);
}


function supportsAPL(handlerInput) {
    const { supportedInterfaces } = handlerInput.requestEnvelope.context.System.device;
    return !!supportedInterfaces['Alexa.Presentation.APL'];
}

function supportsAPLA(handlerInput) {
    const { supportedInterfaces } = handlerInput.requestEnvelope.context.System.device;
    return !!supportedInterfaces['Alexa.Presentation.APLA'];
}

function cleanupTextToSpeech(text) {
    if (text) {
        // Regular expression to identify HTML tags in 
        // the input string. Replacing the identified 
        // HTML tag with a null string.
        const HTML_TAG_REGEXP = /(<([^>]+)>)/ig;
        return text.replace(HTML_TAG_REGEXP, '');
    }
    return '';
}

module.exports = {
    callDirectiveService,
    supportsAPL,
    supportsAPLA,
    cleanupTextToSpeech
}