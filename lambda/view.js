const util = require('./util');
const constants = require('./constants');

function showImages(handlerInput, images) {
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

function playMp3Audio(handlerInput, urlmp3){
    if (util.supportsAPLA(handlerInput)) {
        handlerInput.responseBuilder.addDirective({
            type: 'Alexa.Presentation.APLA.RenderDocument',
            token: constants.APLA.audioReport.token,
            document: constants.APLA.audioReport.document,
            datasources: {
                source: urlmp3            
            }
        });
    } else {
        handlerInput.responseBuilder.speak(handlerInput.t('UNSUPPORTED_DEVICE_MSG'));
    }
}

module.exports = { 
    showImages,
    playMp3Audio
};