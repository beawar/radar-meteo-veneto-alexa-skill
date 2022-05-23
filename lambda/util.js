const he = require('he');
const xml2js = require('xml2js');

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
    return !!supportedInterfaces['Alexa.Presentation.APL'];
}

async function parseXml(text) {
    if (text) {
        const decodedText = he.decode(text);
        return xml2js.parseStringPromise(decodedText)
        .catch((error) => {
            console.log(error);
            return '';
        });
    }
    return Promise.resolve('');
}

function htmlToString(html) {
    return html ? html.replace(/(<([^>]+)>)/gi, '').replace(/\s+/gim, ' ') : ''
}

function buildSentence(...str){
    return ` <s>${htmlToString(str.join(' ').trim())}</s> `;
}

function buildParagraph(...str){
    return ` <p>${str.join(' ').trim()}</p> `;
}

module.exports = {
    callDirectiveService,
    supportsAPL,
    supportsAPLA,
    parseXml,
    htmlToString,
    buildSentence,
    buildParagraph
}