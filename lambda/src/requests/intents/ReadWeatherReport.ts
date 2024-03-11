import type { RequestHandler } from "ask-sdk-core";
import { getIntentName, getRequestType } from "ask-sdk-core";
import { callDirectiveService } from "../../utils";
import { PLAY_BEHAVIOR, REPORT_ENTRY } from "../../constants";
import { getReportObj } from "../../model/report/utils";
import {
  buildReportViewer,
  parseReportObjToSpeech,
} from "../../view/report-viewer";
import { supportsAPL } from "../../view/utils";

export const ReadWeatherReportIntentHandler: RequestHandler = {
  canHandle(handlerInput) {
    return (
      getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      getIntentName(handlerInput.requestEnvelope) === "ReadWeatherReportIntent"
    );
  },
  async handle(handlerInput) {
    try {
      // call the progressive response service
      await callDirectiveService(
        handlerInput,
        handlerInput.t("PROGRESSIVE_MSG"),
      );
    } catch (error) {
      // if it fails we can continue, but the user will wait without progressive response
      console.log(`Progressive response directive error: ${String(error)}`);
    }

    const reportEntryObj = await getReportObj(REPORT_ENTRY.veneto);

    if (reportEntryObj === undefined) {
      return handlerInput.responseBuilder
        .speak(handlerInput.t("ERROR_MSG"), PLAY_BEHAVIOR.replaceAll)
        .reprompt(handlerInput.t("REPROMPT_MSG"))
        .getResponse();
    }

    if (supportsAPL(handlerInput)) {
      const viewDirective = buildReportViewer(handlerInput, reportEntryObj);
      handlerInput.responseBuilder.addDirective(viewDirective);
    }

    const reportSpeech = parseReportObjToSpeech(handlerInput, reportEntryObj);
    return handlerInput.responseBuilder
      .speak(reportSpeech, PLAY_BEHAVIOR.replaceAll)
      .reprompt(handlerInput.t("REPROMPT_MSG"))
      .getResponse();
  },
};
