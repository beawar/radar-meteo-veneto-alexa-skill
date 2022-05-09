const util = require('./util');
const constants = require('./constants');

function showImages(handlerInput, images) {
    // Add APL directive to response
    if (util.supportsAPL(handlerInput)) {
        const { Viewport } = handlerInput.requestEnvelope.context;
        const resolution = Viewport.pixelWidth + 'x' + Viewport.pixelHeight;
        const imagesUrl = images.map((imageSrc) => ({
            url: imageSrc
        }));
        handlerInput.responseBuilder.addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            version: '1.1',
            document: constants.APL.radarPlayer,
            // datasources: {
            //     launchData: {
            //         type: 'object',
            //         properties: {
            //             headerTitle: handlerInput.t('LAUNCH_HEADER_MSG'),
            //             mainText: isBirthday ? sessionAttributes['age'] : handlerInput.t('DAYS_LEFT_MSG', {name: '', count: sessionAttributes['daysLeft']}),
            //             hintString: handlerInput.t('LAUNCH_HINT_MSG'),
            //             logoImage: isBirthday ? null : Viewport.pixelWidth > 480 ? util.getS3PreSignedUrl('Media/full_icon_512.png') : util.getS3PreSignedUrl('Media/full_icon_108.png'),
            //             backgroundImage: isBirthday ? util.getS3PreSignedUrl('Media/cake_'+resolution+'.png') : util.getS3PreSignedUrl('Media/papers_'+resolution+'.png'),
            //             backgroundOpacity: isBirthday ? "1" : "0.5"
            //         },
            //         transformers: [{
            //             inputPath: 'hintString',
            //             transformer: 'textToHint',
            //         }]
            //     }
            // }
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