import type { RequestHandler } from "ask-sdk-core";
import { getIntentName, getRequestType } from "ask-sdk-core";

export const CancelAndStopIntentHandler: RequestHandler = {
  canHandle(handlerInput) {
    return (
      getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      (getIntentName(handlerInput.requestEnvelope) === "AMAZON.CancelIntent" ||
        getIntentName(handlerInput.requestEnvelope) === "AMAZON.StopIntent")
    );
  },
  handle(handlerInput) {
    const speechText = handlerInput.t("GOODBYE_MSG", { name: "" });

    return handlerInput.responseBuilder
      .speak(speechText)
      .withShouldEndSession(true) // session can remain open if APL doc was rendered
      .getResponse();
  },
};
