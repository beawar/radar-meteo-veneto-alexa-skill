import fetch from "cross-fetch";
import { REPORT_XML_URL } from "../../constants";
import { parseXml } from "../../utils";
import type { Report } from "./types";

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
