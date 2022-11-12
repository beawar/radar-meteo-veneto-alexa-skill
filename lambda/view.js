const util = require('./util');
const constants = require('./constants');

function buildRadarPlayer(handlerInput, images) {
    // Add APL directive to response
    if (util.supportsAPL(handlerInput)) {
        const imagesUrl = images.map((imageSrc) => ({
            url: imageSrc
        }));

        handlerInput.responseBuilder.addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            token: constants.APL.radarPlayer.token,
            document: constants.APL.radarPlayer.document,
            datasources: {
                radarImagesData: {
                    type: 'object',
                    properties: {
                        images: imagesUrl
                    }
                }
            }
        });
    } else {
        handlerInput.responseBuilder.speak(handlerInput.t('UNSUPPORTED_DEVICE_MSG'));
    }
}

function buildReportViewer(handlerInput, reportEntryObj) {
    // Add APL directive to response
    if (util.supportsAPL(handlerInput)) {
        const reportContent = [
            {
                titleText: handlerInput.t('REPORT_GENERAL'),
                contentText: reportEntryObj.evoluzionegenerale[0]
            }
        ];
        if (reportEntryObj.avviso[0] ) {
            reportContent.push({
                titleText: handlerInput.t('REPORT_ALLARM'),
                contentText: reportEntryObj.avviso[0]
            })
        }
        if (reportEntryObj.fenomeniparticolari[0]) {
            reportContent.push({
                titleText: handlerInput.t('REPORT_PARTICULAR_PHENOMENA'),
                contentText: reportEntryObj.fenomeniparticolari[0]
            })
        }

        handlerInput.responseBuilder.addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            token: constants.APL.reportViewer.token,
            document: constants.APL.reportViewer.document,
            datasources: {
                reportViewerData: {
                    type: 'object',
                    properties: {
                        foregroundImageLocation: "left",
                        foregroundImageSource: `https://www.arpa.veneto.it/previsioni/it/images/map_${reportEntryObj['$'].bollettinoid}_1.png`,
                        headerTitle: reportEntryObj['$'].title,
                        headerSubtitle: reportEntryObj['$'].name,
                        hintText: handlerInput.t('REPORT_HINT'),
                        headerAttributionImage: "https://www.arpa.veneto.it/logo_arpav.gif",
                        textAlignment: "start",
                        content: reportContent
                    }
                }
            }
        });
    }
}

module.exports = { 
    buildRadarPlayer,
    buildReportViewer
};