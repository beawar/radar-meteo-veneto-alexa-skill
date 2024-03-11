import type { HandlerInput } from "ask-sdk-core";
import { APL, ATTRIBUTION, LOGO_URL } from "../constants";
import type { Bollettino } from "../model/report/types";
import { buildParagraph, buildSentence } from "../utils";
import { buildDirective } from "./utils";

function extractReportContent(
  handlerInput: HandlerInput,
  reportEntryObj: Bollettino,
) {
  const reportContent: { titleText: string; contentText: string }[] = [];
  if (reportEntryObj.evoluzionegenerale) {
    reportContent.push({
      titleText: handlerInput.t("REPORT_GENERAL"),
      contentText: reportEntryObj.evoluzionegenerale,
    });
  }
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
  if (reportEntryObj.giorno[0]) {
    reportContent.push({
      titleText: handlerInput.t("REPORT_TODAY"),
      contentText: reportEntryObj.giorno[0].text,
    });
  }
  return reportContent;
}

export function buildReportViewer(
  handlerInput: HandlerInput,
  reportEntryObj: Bollettino,
) {
  const reportContent = extractReportContent(handlerInput, reportEntryObj);
  const today = reportEntryObj.giorno[0];
  const todayImage =
    today &&
    (Array.isArray(today.img)
      ? today.img[today.img.length - 1]?._src
      : today.img._src);

  return buildDirective(APL.reportReader, {
    reportReaderData: {
      type: "object",
      properties: {
        imagesLocation: "left",
        images: todayImage,
        headerText: reportEntryObj._title,
        headerSubText: reportEntryObj._name,
        hint: handlerInput.t("REPORT_HINT"),
        headerAttributionImage: LOGO_URL,
        textAlignment: "start",
        content: reportContent,
        attributionName: ATTRIBUTION.name,
        attributionWebsite: ATTRIBUTION.website,
      },
      transformers: [
        {
          inputPath: "hint",
          transformer: "textToHint",
          outputName: "hintText",
        },
      ],
    },
  });
}

export function parseReportObjToSpeech(
  handlerInput: HandlerInput,
  reportEntry: Bollettino,
) {
  const reportContent = extractReportContent(handlerInput, reportEntry);
  const speechText = reportContent.map((entry) => {
    return buildParagraph(
      buildSentence(`${entry.titleText}:`),
      ...entry.contentText
        .split(".")
        .map((sentence) => buildSentence(sentence)),
    );
  });
  return speechText.join();
}
