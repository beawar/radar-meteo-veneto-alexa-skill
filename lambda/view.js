const util = require('./util');
const constants = require('./constants');

function showImages(handlerInput, images) {
    // Add APL directive to response
    if (util.supportsAPL(handlerInput)) {
        console.debug('show images', images);
        const { Viewport } = handlerInput.requestEnvelope.context;
        const resolution = Viewport.pixelWidth + 'x' + Viewport.pixelHeight;
        const imagesUrl = images.map((imageSrc) => ({
            url: imageSrc
        }));
        console.debug('images url', imagesUrl);
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
        handlerInput.responseBuilder.speak(handlerInput.t('UNSUPPORTED_MSG', 'Show images is not supported by this device'));
    }
}

module.exports = { showImages };