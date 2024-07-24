import type { HandlerInput } from "ask-sdk-core";
import { APL, ATTRIBUTION, LOGO_URL } from "../constants";
import type { Bollettino, Giorno } from "../model/report/types";
import { buildParagraph, buildSentence } from "../utils";
import { buildDirective } from "./utils";

function isGeneralReport(report: Bollettino | Giorno): report is Bollettino {
  return "evoluzioneGenerale" in report;
}

function isDailyReport(report: Bollettino | Giorno): report is Giorno {
  return "_data" in report;
}

function extractReportContent(
  handlerInput: HandlerInput,
  reportEntryObj: Bollettino | Giorno,
) {
  const reportContent: { titleText: string; contentText: string }[] = [];
  if (isGeneralReport(reportEntryObj)) {
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
  } else {
    reportContent.push({
      titleText: reportEntryObj._data,
      contentText: reportEntryObj.text,
    });
  }
  return reportContent;
}

export function buildReportViewer(
  handlerInput: HandlerInput,
  reportEntryObj: Pick<Bollettino, "_title" | "_name"> & (Bollettino | Giorno),
) {
  const reportContent = extractReportContent(handlerInput, reportEntryObj);
  const images = isDailyReport(reportEntryObj)
    ? [reportEntryObj.img]
        .flat()
        .map(({ _src, _caption }) => ({ src: _src, caption: _caption }))
    : [];

  return buildDirective(APL.reportReader, {
    reportReaderData: {
      type: "object",
      properties: {
        imagesLocation: "left",
        images,
        headerTitle: reportEntryObj._title,
        headerSubtitle: reportEntryObj._name,
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
  reportEntry: Bollettino | Giorno,
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
