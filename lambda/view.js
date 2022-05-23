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

module.exports = { 
    showImages
};