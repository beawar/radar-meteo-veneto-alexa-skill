import { HandlerInput } from "ask-sdk-core";
import fetch from 'cross-fetch';
import { Bollettino, Report } from "./types";
import { buildParagraph, buildSentence, parseXml } from "../../utils";

export async function parseReportXmlToObj(
  reportXml: string,
  handlerInput: HandlerInput
) {
  try {
    return await parseXml(reportXml);
  } catch (error) {
    console.error(error);
    return handlerInput.t("API_ERROR_MSG");
  }
}

export function findReportEntry(reportObj: Report, entryId: string) {
  return reportObj.previsioni.bollettini.bollettino.find(
    (bollettino) => bollettino._bollettinoid === entryId
  );
}

export function parseReportObjToSpeech(
  reportEntry: Bollettino,
  handlerInput: HandlerInput
) {
  let speechText = "";
  if (reportEntry.evoluzionegenerale[0]) {
    speechText += buildSentence(
      `${handlerInput.t("REPORT_GENERAL")}:`,
      reportEntry.evoluzionegenerale[0]
    );
  }
  if (reportEntry.avviso[0]) {
    speechText += buildSentence(
      `${handlerInput.t("REPORT_ALLARM")}:`,
      reportEntry.avviso[0]
    );
  }
  if (reportEntry.fenomeniparticolari[0]) {
    speechText += buildSentence(
      `${handlerInput.t("REPORT_PARTICULAR_PHENOMENA")}:`,
      reportEntry.fenomeniparticolari[0]
    );
  }
  if (reportEntry.giorno[0]) {
    speechText += buildParagraph(
      buildSentence(`${handlerInput.t("REPORT_TODAY")}:`),
      buildSentence(reportEntry.giorno[0].text)
    );
  }
  return speechText;
}

export async function fetchReport() {
  const url =
    "https://www.arpa.veneto.it/previsioni/it/xml/bollettino_utenti.xml";
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getReportObj(
  handlerInput: HandlerInput,
  reportEntryId: string
) {
  const reportText = await fetchReport();
  const reportObj = await parseReportXmlToObj(reportText, handlerInput);
  return findReportEntry(reportObj, reportEntryId);
}
