import type { ErrorHandler as AskErrorHandler } from "ask-sdk-core";

/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below
 * */
export const ErrorHandler: AskErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    const speechText = handlerInput.t("ERROR_MSG");
    console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(handlerInput.t("REPROMPT_MSG"))
      .getResponse();
  },
};
