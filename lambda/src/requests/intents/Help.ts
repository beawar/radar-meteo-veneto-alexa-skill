import type { RequestHandler } from "ask-sdk-core";
import { getIntentName, getRequestType } from "ask-sdk-core";
import { PLAY_BEHAVIOR } from "../../constants";

export const HelpIntentHandler: RequestHandler = {
  canHandle(handlerInput) {
    return (
      getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      getIntentName(handlerInput.requestEnvelope) === "AMAZON.HelpIntent"
    );
  },
  handle(handlerInput) {
    const speechText = handlerInput.t("HELP_MSG");

    return handlerInput.responseBuilder
      .speak(speechText, PLAY_BEHAVIOR.replaceAll)
      .reprompt(speechText)
      .getResponse();
  },
};
