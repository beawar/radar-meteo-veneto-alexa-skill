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

export const DETAILED_AUDIO_WEATHER_REPORT = {
  url: "https://www.arpa.veneto.it/previsioni/audio/meteoveneto.mp3",
  title: "Bollettino dettagliato veneto",
};

export const BASIC_AUDIO_WEATHER_REPORT = {
  src: "https://www.arpa.veneto.it/previsioni/audio/meteoradio.mp3",
  title: "Bollettino radio veneto",
};

export const REPORT_ENTRY = {
  veneto: "MV",
  dolomiti: "DM",
  pianura: "MP",
};
