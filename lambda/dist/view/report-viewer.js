"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildReportViewer = void 0;
const constants_1 = require("../constants");
const utils_1 = require("./utils");
function buildReportViewer(handlerInput, reportEntryObj) {
    // Add APL directive to response
    if ((0, utils_1.supportsAPL)(handlerInput)) {
        const reportContent = [
            {
                titleText: handlerInput.t('REPORT_GENERAL'),
                contentText: reportEntryObj.evoluzionegenerale[0]
            }
        ];
        if (reportEntryObj.avviso[0]) {
            reportContent.push({
                titleText: handlerInput.t('REPORT_ALLARM'),
                contentText: reportEntryObj.avviso[0]
            });
        }
        if (reportEntryObj.fenomeniparticolari[0]) {
            reportContent.push({
                titleText: handlerInput.t('REPORT_PARTICULAR_PHENOMENA'),
                contentText: reportEntryObj.fenomeniparticolari[0]
            });
        }
        handlerInput.responseBuilder.addDirective((0, utils_1.buildDirective)(constants_1.APL.reportReader, {
            reportReaderData: {
                type: 'object',
                properties: {
                    foregroundImageLocation: "left",
                    foregroundImageSource: `https://www.arpa.veneto.it/previsioni/it/images/map_${reportEntryObj._bollettinoid}_0.png`,
                    headerTitle: reportEntryObj._title,
                    headerSubtitle: reportEntryObj._name,
                    hintText: handlerInput.t('REPORT_HINT'),
                    headerAttributionImage: "https://www.arpa.veneto.it/logo_arpav.gif",
                    textAlignment: "start",
                    content: reportContent
                }
            }
        }));
    }
}
exports.buildReportViewer = buildReportViewer;
