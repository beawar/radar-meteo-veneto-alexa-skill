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


module.exports = {
    callDirectiveService,
    supportsAPL
}