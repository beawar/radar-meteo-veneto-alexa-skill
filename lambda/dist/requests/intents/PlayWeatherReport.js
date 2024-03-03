"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayWeatherReportIntentHandler = void 0;
const ask_sdk_core_1 = require("ask-sdk-core");
const constants_1 = require("../../constants");
const utils_1 = require("../../model/audio/utils");
const audio_player_1 = require("../../view/audio-player");
exports.PlayWeatherReportIntentHandler = {
    canHandle(handlerInput) {
        return ((0, ask_sdk_core_1.getRequestType)(handlerInput.requestEnvelope) === "IntentRequest" &&
            (0, ask_sdk_core_1.getIntentName)(handlerInput.requestEnvelope) === "PlayWeatherReportIntent");
    },
    handle(handlerInput) {
        // TODO:
        //   1) [DONE] retrieve mp3 of detailed report from https://www.arpa.veneto.it/previsioni/audio/meteoveneto.mp3
        //   2) [DONE] make alexa speak mp3
        //   3) [optional] display detailed report text on device (where supported)
        //   PART 3:
        //   1) Retrieve report images from https://www.arpa.veneto.it/previsioni/it/xml/bollettino_utenti.xml (tag bollettini)
        //   2) Show images on devices with display
        const audioData = {
            audioSources: [(0, utils_1.buildAudioUrl)(constants_1.AUDIO_WEATHER_REPORT_URL)],
            headerTitle: handlerInput.t("REPORT_TITLE"),
            primaryText: new Date().toLocaleDateString(handlerInput.getLocale(), {
                day: "numeric",
                month: "long",
                year: "numeric",
            }),
            secondaryText: "",
        };
        (0, audio_player_1.buildAudioPlayer)(handlerInput, audioData);
        return handlerInput.responseBuilder.getResponse();
    },
};
//# sourceMappingURL=PlayWeatherReport.js.map