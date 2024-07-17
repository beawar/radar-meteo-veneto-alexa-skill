import type { RequestHandler } from "ask-sdk-core";
import { getIntentName, getRequestType, getSlotValue } from "ask-sdk-core";
import { callDirectiveService } from "../../utils";
import { PLAY_BEHAVIOR, REPORT_ENTRY } from "../../constants";
import { getReportObj } from "../../model/report/utils";
import {
  buildReportViewer,
  parseReportObjToSpeech,
} from "../../view/report-viewer";
import { supportsAPL } from "../../view/utils";
import type { Bollettino } from "../../model/report/types";

const SLOTS = {
  report_date: "report_date",
};

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

    const reportDateSlot = getSlotValue(
      handlerInput.requestEnvelope,
      SLOTS.report_date,
    );

    if (reportDateSlot) {
      findReportForDate(reportEntryObj, reportDateSlot);
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

function findReportForDate(reportEntryObj: Bollettino, date: string) {
  console.log(date);
  return reportEntryObj;
}
