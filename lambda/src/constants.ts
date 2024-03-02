import { interfaces, ui } from "ask-sdk-model";

export const APL = {
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
} satisfies Record<string, interfaces.alexa.presentation.apl.RenderDocumentDirective>;

export const PLAY_BEHAVIOR = {
  enqueue: "ENQUEUE",
  replaceAll: "REPLACE_ALL",
  replaceEnqueued: "REPLACE_ENQUEUED",
} satisfies Record<string, ui.PlayBehavior>;

export const AUDIO_WEATHER_REPORT_URL = "https://www.arpa.veneto.it/risorse/data-bollettini/meteo/mp3/meteoveneto.mp3";

export const REPORT_ENTRY = {
  veneto: "MV",
  dolomiti: "DM",
  pianura: "MP",
};

export const REPORT_XML_URL = 'https://www.arpa.veneto.it/risorse/data-bollettini/meteo/bollettini/it/xml/bollettino_utenti.xml';

export const LOGO_URL = 'https://www.arpa.veneto.it/logo_arpav.png'
