"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseReportObjToSpeech = exports.buildReportViewer = void 0;
const constants_1 = require("../constants");
const utils_1 = require("../utils");
const utils_2 = require("./utils");
function isGeneralReport(report) {
    return "evoluzioneGenerale" in report;
}
function isDailyReport(report) {
    return "_data" in report;
}
function extractReportContent(handlerInput, reportEntryObj) {
    const reportContent = [];
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
    }
    else {
        reportContent.push({
            titleText: reportEntryObj._data,
            contentText: reportEntryObj.text,
        });
    }
    return reportContent;
}
function buildReportViewer(handlerInput, reportEntryObj) {
    const reportContent = extractReportContent(handlerInput, reportEntryObj);
    const images = isDailyReport(reportEntryObj)
        ? [reportEntryObj.img]
            .flat()
            .map(({ _src, _caption }) => ({ src: _src, caption: _caption }))
        : [];
    return (0, utils_2.buildDirective)(constants_1.APL.reportReader, {
        reportReaderData: {
            type: "object",
            properties: {
                imagesLocation: "left",
                images,
                headerTitle: reportEntryObj._title,
                headerSubtitle: reportEntryObj._name,
                hint: handlerInput.t("REPORT_HINT"),
                headerAttributionImage: constants_1.LOGO_URL,
                textAlignment: "start",
                content: reportContent,
                attributionName: constants_1.ATTRIBUTION.name,
                attributionWebsite: constants_1.ATTRIBUTION.website,
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
exports.buildReportViewer = buildReportViewer;
function parseReportObjToSpeech(handlerInput, reportEntry) {
    const reportContent = extractReportContent(handlerInput, reportEntry);
    const speechText = reportContent.map((entry) => {
        return (0, utils_1.buildParagraph)((0, utils_1.buildSentence)(`${entry.titleText}:`), ...entry.contentText
            .split(".")
            .map((sentence) => (0, utils_1.buildSentence)(sentence)));
    });
    return speechText.join();
}
exports.parseReportObjToSpeech = parseReportObjToSpeech;
//# sourceMappingURL=report-viewer.js.map