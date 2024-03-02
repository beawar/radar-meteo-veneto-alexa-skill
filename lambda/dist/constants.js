"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REPORT_ENTRY = exports.BASIC_AUDIO_WEATHER_REPORT = exports.DETAILED_AUDIO_WEATHER_REPORT = exports.PLAY_BEHAVIOR = exports.APL = void 0;
exports.APL = {
    radarPlayer: {
        type: "Alexa.Presentation.APL.RenderDocument",
        document: {
            src: "doc://alexa/apl/documents/images-player",
            type: "Link",
        },
        token: "radarPlayerToken",
    },
    reportReader: {
        type: "Alexa.Presentation.APL.RenderDocument",
        document: {
            src: "doc://alexa/apl/documents/report-reader",
            type: "Link",
        },
        token: "reportViewerToken",
    },
    audioPlayer: {
        type: "Alexa.Presentation.APL.RenderDocument",
        document: {
            src: "doc://alexa/apl/documents/audio-player",
            type: "Link",
        },
        token: "audioPlayerToken",
    },
};
exports.PLAY_BEHAVIOR = {
    enqueue: "ENQUEUE",
    replaceAll: "REPLACE_ALL",
    replaceEnqueued: "REPLACE_ENQUEUED",
};
exports.DETAILED_AUDIO_WEATHER_REPORT = {
    url: "https://www.arpa.veneto.it/previsioni/audio/meteoveneto.mp3",
    title: "Bollettino dettagliato veneto",
};
exports.BASIC_AUDIO_WEATHER_REPORT = {
    src: "https://www.arpa.veneto.it/previsioni/audio/meteoradio.mp3",
    title: "Bollettino radio veneto",
};
exports.REPORT_ENTRY = {
    veneto: "MV",
    dolomiti: "DM",
    pianura: "MP",
};
//# sourceMappingURL=constants.js.map