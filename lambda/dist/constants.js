"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LOGO_URL = exports.REPORT_XML_URL = exports.REPORT_ENTRY = exports.AUDIO_WEATHER_REPORT_URL = exports.PLAY_BEHAVIOR = exports.APL = exports.I18N_NS_DEFAULT = void 0;
exports.I18N_NS_DEFAULT = "translation";
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
exports.AUDIO_WEATHER_REPORT_URL = "https://www.arpa.veneto.it/risorse/data-bollettini/meteo/mp3/meteoveneto.mp3";
exports.REPORT_ENTRY = {
    veneto: "MV",
    dolomiti: "DM",
    pianura: "MP",
};
exports.REPORT_XML_URL = "https://www.arpa.veneto.it/risorse/data-bollettini/meteo/bollettini/it/xml/bollettino_utenti.xml";
exports.LOGO_URL = "https://www.arpa.veneto.it/logo_arpav.png";
//# sourceMappingURL=constants.js.map