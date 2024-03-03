"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseReportObjToSpeech = exports.buildReportViewer = void 0;
const constants_1 = require("../constants");
const utils_1 = require("../utils");
const utils_2 = require("./utils");
function extractReportContent(handlerInput, reportEntryObj) {
    const reportContent = [];
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
function buildReportViewer(handlerInput, reportEntryObj) {
    var _a;
    const reportContent = extractReportContent(handlerInput, reportEntryObj);
    const today = reportEntryObj.giorno[0];
    const todayImage = today &&
        (Array.isArray(today.img)
            ? (_a = today.img[today.img.length - 1]) === null || _a === void 0 ? void 0 : _a._src
            : today.img._src);
    return (0, utils_2.buildDirective)(constants_1.APL.reportReader, {
        reportReaderData: {
            type: "object",
            properties: {
                foregroundImageLocation: "left",
                foregroundImageSource: todayImage,
                headerTitle: reportEntryObj._title,
                headerSubtitle: reportEntryObj._name,
                hintText: handlerInput.t("REPORT_HINT"),
                headerAttributionImage: constants_1.LOGO_URL,
                textAlignment: "start",
                content: reportContent,
            },
        },
    });
}
exports.buildReportViewer = buildReportViewer;
function parseReportObjToSpeech(handlerInput, reportEntry) {
    const reportContent = extractReportContent(handlerInput, reportEntry);
    const speechText = reportContent.map((entry) => {
        return (0, utils_1.buildParagraph)((0, utils_1.buildSentence)(`${entry.title}:`), ...entry.content
            .split(".")
            .map((sentence) => (0, utils_1.buildSentence)(`${sentence}.`)));
    });
    return speechText.join();
}
exports.parseReportObjToSpeech = parseReportObjToSpeech;
//# sourceMappingURL=report-viewer.js.map