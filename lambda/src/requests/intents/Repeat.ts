import type { RequestHandler } from "ask-sdk-core";
import { getIntentName, getRequestType } from "ask-sdk-core";
import { LAST_SPEECH_ATTRIBUTE_KEY } from "../../constants";

export const RepeatIntentHandler: RequestHandler = {
  canHandle(handlerInput) {
    return (
      getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      getIntentName(handlerInput.requestEnvelope) === "AMAZON.RepeatIntent"
    );
  },
  handle(handlerInput) {
    const sessionAttributes =
      handlerInput.attributesManager.getSessionAttributes();
    const lastResponse =
      (typeof sessionAttributes[LAST_SPEECH_ATTRIBUTE_KEY] === "string" &&
        sessionAttributes[LAST_SPEECH_ATTRIBUTE_KEY]) ||
      handlerInput.t("NOTHING_TO_REPEAT");

    return handlerInput.responseBuilder
      .speak(lastResponse)
      .reprompt(lastResponse)
      .getResponse();
  },
};
