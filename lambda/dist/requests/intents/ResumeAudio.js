"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResumeAudioIntentHandler = void 0;
const ask_sdk_core_1 = require("ask-sdk-core");
exports.ResumeAudioIntentHandler = {
    canHandle(handlerInput) {
        return (0, ask_sdk_core_1.getRequestType)(handlerInput.requestEnvelope) === 'IntentRequest'
            && (0, ask_sdk_core_1.getIntentName)(handlerInput.requestEnvelope) === 'AMAZON.ResumeIntent';
    },
    handle(handlerInput) {
        // const audioData = {
        //     audioSources: [buildAudioUrl(reportType.src)],
        //     headerTitle: handlerInput.t('REPORT_TITLE'),
        //     primaryText: reportType.title,
        //     secondaryText: new Date().toLocaleDateString(handlerInput.getLocale(), { day: 'numeric', month: 'long', year: 'numeric' })
        // };
        // buildAudioPlayer(handlerInput, audioData);
        return handlerInput.responseBuilder
            .getResponse();
    }
};
//# sourceMappingURL=ResumeAudio.js.map