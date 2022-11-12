const util = require('./util');
const constants = require('./constants');

function buildDirective(directive, datasources) {
    return {
        type: directive.type,
        document: directive.document,
        token: directive.token,
        datasources
    }
}

function buildRadarPlayer(handlerInput, images) {
    // Add APL directive to response
    if (util.supportsAPL(handlerInput)) {
        const imagesUrl = images.map((imageSrc) => ({
            url: imageSrc
        }));

        handlerInput.responseBuilder.addDirective(
            buildDirective(
                constants.APL.radarPlayer,
                {
                    radarImagesData: {
                        type: 'object',
                        properties: {
                            images: imagesUrl
                        }
                    }
                }

            ));
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
        if (reportEntryObj.avviso[0]) {
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

        handlerInput.responseBuilder.addDirective(
            buildDirective(
                constants.APL.reportReader,
                {
                    reportReaderData: {
                        type: 'object',
                        properties: {
                            foregroundImageLocation: "left",
                            foregroundImageSource: `https://www.arpa.veneto.it/previsioni/it/images/map_${reportEntryObj['$'].bollettinoid}_0.png`,
                            headerTitle: reportEntryObj['$'].title,
                            headerSubtitle: reportEntryObj['$'].name,
                            hintText: handlerInput.t('REPORT_HINT'),
                            headerAttributionImage: "https://www.arpa.veneto.it/logo_arpav.gif",
                            textAlignment: "start",
                            content: reportContent
                        }
                    }
                }
            ));
    }
}

function buildAudioPlayer(handlerInput, { audioSources, headerTitle, primaryText, secondaryText, coverImageSource }) {
    if (audioSources && audioSources.length > 0) {
        if (util.supportsAPL(handlerInput)) {
            handlerInput.responseBuilder.addDirective(
                buildDirective(
                    constants.APL.audioPlayer,
                    {
                        audioPlayerData: {
                            type: "object",
                            properties: {
                                audioControlType: "jump10",
                                audioSources,
                                backgroundImage: "",
                                coverImageSource,
                                headerTitle,
                                logoUrl: "https://www.arpa.veneto.it/logo_arpav.gif",
                                primaryText,
                                secondaryText,
                                sliderType: "determinate"
                            }
                        }
                    }
                )
            )
        } else {
            handlerInput.responseBuilder
                .addAudioPlayerPlayDirective(
                    constants.PlayBehavior.REPLACE_ALL,
                    audioSources[0],
                    constants.APL.audioPlayer.token,
                    0,
                    undefined,
                    {
                        title: primaryText,
                        subtitle: secondaryText,
                        art: coverImageSource
                    });
        }
    }
}

module.exports = {
    buildRadarPlayer,
    buildReportViewer,
    buildAudioPlayer
};