import type { RequestHandler } from "ask-sdk-core";
import { getIntentName, getRequestType } from "ask-sdk-core";

/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents
 * by defining them above, then also adding them to the request handler chain below
 * */
export const IntentReflectorHandler: RequestHandler = {
  canHandle(handlerInput) {
    return getRequestType(handlerInput.requestEnvelope) === "IntentRequest";
  },
  handle(handlerInput) {
    const intentName = getIntentName(handlerInput.requestEnvelope);
    const speechText = handlerInput.t("REFLECTOR_MSG", { intent: intentName });

    return (
      handlerInput.responseBuilder
        .speak(speechText)
        //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
        .getResponse()
    );
  },
};
