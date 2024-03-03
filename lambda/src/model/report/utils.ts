import type { HandlerInput } from "ask-sdk-core";
import fetch from "cross-fetch";
import type { Bollettino, Report } from "./types";
import { buildParagraph, buildSentence, parseXml } from "../../utils";
import { REPORT_XML_URL } from "../../constants";

export async function parseReportXmlToObj(reportXml: string) {
  try {
    return await parseXml<Report>(reportXml);
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export function findReportEntry(reportObj: Report, entryId: string) {
  return reportObj.previsioni.bollettini.bollettino.find(
    (bollettino) => bollettino._bollettinoid === entryId,
  );
}

export function parseReportObjToSpeech(
  reportEntry: Bollettino,
  handlerInput: HandlerInput,
) {
  let speechText = "";
  if (reportEntry.evoluzionegenerale[0]) {
    speechText += buildSentence(
      `${handlerInput.t("REPORT_GENERAL")}:`,
      reportEntry.evoluzionegenerale[0],
    );
  }
  if (reportEntry.avviso[0]) {
    speechText += buildSentence(
      `${handlerInput.t("REPORT_ALLARM")}:`,
      reportEntry.avviso[0],
    );
  }
  if (reportEntry.fenomeniparticolari[0]) {
    speechText += buildSentence(
      `${handlerInput.t("REPORT_PARTICULAR_PHENOMENA")}:`,
      reportEntry.fenomeniparticolari[0],
    );
  }
  if (reportEntry.giorno[0]) {
    speechText += buildParagraph(
      buildSentence(`${handlerInput.t("REPORT_TODAY")}:`),
      buildSentence(reportEntry.giorno[0].text),
    );
  }
  return speechText;
}

export async function fetchReport() {
  try {
    const response = await fetch(REPORT_XML_URL);
    return await response.text();
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getReportObj(reportEntryId: string) {
  const reportText = await fetchReport();
  if (reportText) {
    const reportObj = await parseReportXmlToObj(reportText);
    return reportObj && findReportEntry(reportObj, reportEntryId);
  }
  return undefined;
}
