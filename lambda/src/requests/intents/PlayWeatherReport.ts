import type { RequestHandler} from "ask-sdk-core";
import { getIntentName, getRequestType } from "ask-sdk-core";
import { AUDIO_WEATHER_REPORT_URL } from "../../constants";
import { buildAudioUrl } from "../../model/audio/utils";
import type { AudioPlayerData} from "../../view/audio-player";
import { buildAudioPlayer } from "../../view/audio-player";

export const PlayWeatherReportIntentHandler: RequestHandler = {
  canHandle(handlerInput) {
    return (
      getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      getIntentName(handlerInput.requestEnvelope) === "PlayWeatherReportIntent"
    );
  },
  handle(handlerInput) {
    // TODO:
    //   1) [DONE] retrieve mp3 of detailed report from https://www.arpa.veneto.it/previsioni/audio/meteoveneto.mp3
    //   2) [DONE] make alexa speak mp3
    //   3) [optional] display detailed report text on device (where supported)
    //   PART 3:
    //   1) Retrieve report images from https://www.arpa.veneto.it/previsioni/it/xml/bollettino_utenti.xml (tag bollettini)
    //   2) Show images on devices with display

    const audioData: AudioPlayerData = {
      audioSources: [buildAudioUrl(AUDIO_WEATHER_REPORT_URL)],
      headerTitle: handlerInput.t("REPORT_TITLE"),
      primaryText: new Date().toLocaleDateString(handlerInput.getLocale(), {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      secondaryText: "",
    };
    buildAudioPlayer(handlerInput, audioData);

    return handlerInput.responseBuilder.getResponse();
  },
};
