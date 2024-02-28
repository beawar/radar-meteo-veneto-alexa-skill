import { HandlerInput } from "ask-sdk-core";
import { services } from "ask-sdk-model";
import he from "he";
import xml2js from "xml2js";

export function callDirectiveService(handlerInput: HandlerInput, msg: string) {
  // Call Alexa Directive Service.
  const { requestEnvelope } = handlerInput;
  const directiveServiceClient =
    handlerInput.serviceClientFactory?.getDirectiveServiceClient();
  const requestId = requestEnvelope.request.requestId;
  // build the progressive response directive
  const directive: services.directive.SendDirectiveRequest = {
    header: {
      requestId,
    },
    directive: {
      type: "VoicePlayer.Speak",
      speech: msg,
    },
  };
  // send directive
  return directiveServiceClient?.enqueue(directive);
}

export async function parseXml(text: string) {
  const decodedText = he.decode(text);
  return await xml2js.parseStringPromise(decodedText, {
    trim: true,
    explicitArray: false,
    mergeAttrs: true,
    attrNameProcessors: [
      function addPrefix(name) {
        return `_${name}`;
      },
    ],
  });
}

function htmlToString(html: string) {
  return html ? html.replace(/(<([^>]+)>)/gi, "").replace(/\s+/gim, " ") : "";
}

export function buildSentence(...str: string[]) {
  return ` <s>${htmlToString(str.join(" ").trim())}</s> `;
}

export function buildParagraph(...str: string[]) {
  return ` <p>${str.join(" ").trim()}</p> `;
}
