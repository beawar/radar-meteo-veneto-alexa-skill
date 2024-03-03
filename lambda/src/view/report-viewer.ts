import type { HandlerInput } from "ask-sdk-core";
import { APL, LOGO_URL } from "../constants";
import type { Bollettino } from "../model/report/types";
import { buildParagraph, buildSentence } from "../utils";
import { buildDirective } from "./utils";

function extractReportContent(
  handlerInput: HandlerInput,
  reportEntryObj: Bollettino,
) {
  const reportContent: { title: string; content: string }[] = [];
  if (reportEntryObj.evoluzionegenerale) {
    reportContent.push({
      title: handlerInput.t("REPORT_GENERAL"),
      content: reportEntryObj.evoluzionegenerale,
    });
  }
  if (reportEntryObj.avviso) {
    reportContent.push({
      title: handlerInput.t("REPORT_ALLARM"),
      content: reportEntryObj.avviso,
    });
  }
  if (reportEntryObj.fenomeniparticolari) {
    reportContent.push({
      title: handlerInput.t("REPORT_PARTICULAR_PHENOMENA"),
      content: reportEntryObj.fenomeniparticolari,
    });
  }
  if (reportEntryObj.giorno[0]) {
    reportContent.push({
      title: handlerInput.t("REPORT_TODAY"),
      content: reportEntryObj.giorno[0].text,
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
        foregroundImageLocation: "left",
        foregroundImageSource: todayImage,
        headerTitle: reportEntryObj._title,
        headerSubtitle: reportEntryObj._name,
        hintText: handlerInput.t("REPORT_HINT"),
        headerAttributionImage: LOGO_URL,
        textAlignment: "start",
        content: reportContent,
      },
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
      buildSentence(`${entry.title}:`),
      ...entry.content
        .split(".")
        .map((sentence) => buildSentence(`${sentence}.`)),
    );
  });
  return speechText.join();
}
