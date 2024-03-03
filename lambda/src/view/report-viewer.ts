import type { HandlerInput } from "ask-sdk-core";
import type { Bollettino } from "../model/report/types";
import { APL } from "../constants";
import { buildDirective, supportsAPL } from "./utils";

export function buildReportViewer(
  handlerInput: HandlerInput,
  reportEntryObj: Bollettino,
) {
  // Add APL directive to response
  if (supportsAPL(handlerInput)) {
    const reportContent = [
      {
        titleText: handlerInput.t("REPORT_GENERAL"),
        contentText: reportEntryObj.evoluzionegenerale,
      },
    ];
    if (reportEntryObj.avviso) {
      reportContent.push({
        titleText: handlerInput.t("REPORT_ALLARM"),
        contentText: reportEntryObj.avviso,
      });
    }
    if (reportEntryObj.fenomeniparticolari) {
      reportContent.push({
        titleText: handlerInput.t("REPORT_PARTICULAR_PHENOMENA"),
        contentText: reportEntryObj.fenomeniparticolari,
      });
    }

    handlerInput.responseBuilder.addDirective(
      buildDirective(APL.reportReader, {
        reportReaderData: {
          type: "object",
          properties: {
            foregroundImageLocation: "left",
            foregroundImageSource: `https://www.arpa.veneto.it/previsioni/it/images/map_${reportEntryObj._bollettinoid}_0.png`,
            headerTitle: reportEntryObj._title,
            headerSubtitle: reportEntryObj._name,
            hintText: handlerInput.t("REPORT_HINT"),
            headerAttributionImage: "https://www.arpa.veneto.it/logo_arpav.gif",
            textAlignment: "start",
            content: reportContent,
          },
        },
      }),
    );
  }
}
