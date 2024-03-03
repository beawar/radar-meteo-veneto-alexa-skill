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
    // TODO:
    //   PART 1: Alexa reading the summary report
    //   1) retrieve xml from https://www.arpa.veneto.it/previsioni/it/xml/bollettino_utenti.xml (tag bollettini)
    //   2) cleanup text to remove html tags
    //   3) improve text to replace slashes with dash
    //   PART 2:
    //   1) retrieve mp3 of detailed report from https://www.arpa.veneto.it/previsioni/audio/meteoveneto.mp3
    //   2) make alexa speak mp3
    //   3) [optional] display detailed report text on device (where supported)
    //   PART 3:
    //   1) Retrieve report images from https://www.arpa.veneto.it/previsioni/it/xml/bollettino_utenti.xml (tag bollettini)
    //   2) Show images on devices with display

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
