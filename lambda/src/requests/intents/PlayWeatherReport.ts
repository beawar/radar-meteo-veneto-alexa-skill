import { RequestHandler, getIntentName, getRequestType } from "ask-sdk-core";
import { AUDIO_WEATHER_REPORT } from "../../constants";
import { buildAudioUrl } from "../../model/audio/utils";
import { AudioPlayerData, buildAudioPlayer } from "../../view/audio-player";

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

    // assign as default weather report the basic audio. It retrieve an mp3 file audio with the info of
    // the today weather
    const reportType = AUDIO_WEATHER_REPORT;

    const audioData: AudioPlayerData = {
      audioSources: [buildAudioUrl(reportType.src)],
      headerTitle: handlerInput.t("REPORT_TITLE"),
      primaryText: reportType.title,
      secondaryText: new Date().toLocaleDateString(handlerInput.getLocale(), {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    };
    buildAudioPlayer(handlerInput, audioData);

    return handlerInput.responseBuilder.getResponse();
  },
};
