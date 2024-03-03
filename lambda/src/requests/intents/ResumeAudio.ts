import type { RequestHandler } from "ask-sdk-core";
import { getIntentName, getRequestType } from "ask-sdk-core";

export const ResumeAudioIntentHandler: RequestHandler = {
  canHandle(handlerInput) {
    return (
      getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      getIntentName(handlerInput.requestEnvelope) === "AMAZON.ResumeIntent"
    );
  },
  handle(handlerInput) {
    // const audioData = {
    //     audioSources: [buildAudioUrl(reportType.src)],
    //     headerTitle: handlerInput.t('REPORT_TITLE'),
    //     primaryText: reportType.title,
    //     secondaryText: new Date().toLocaleDateString(handlerInput.getLocale(), { day: 'numeric', month: 'long', year: 'numeric' })
    // };
    // buildAudioPlayer(handlerInput, audioData);

    return handlerInput.responseBuilder.getResponse();
  },
};
