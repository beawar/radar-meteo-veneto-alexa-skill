import {
  DefaultApiClient,
  SkillBuilders,
} from "ask-sdk-core";
import { LaunchRequestHandler } from "./requests/Launch";
import { ShowRadarIntentHandler } from "./requests/intents/ShowRadar";
import { ReadWeatherReportIntentHandler } from "./requests/intents/ReadWeatherReport";
import { PlayWeatherReportIntentHandler } from "./requests/intents/PlayWeatcherReport";
import { PauseAudioIntentHandler } from "./requests/intents/PauseAudio";
import { ResumeAudioIntentHandler } from "./requests/intents/ResumeAudio";
import { HelpIntentHandler } from "./requests/intents/Help";
import { CancelAndStopIntentHandler } from "./requests/intents/CancelAndStop";
import { SessionEndedRequestHandler } from "./requests/SessionEnded";
import { FallbackIntentHandler } from "./requests/intents/Fallback";
import { IntentReflectorHandler } from "./requests/IntentReflector";
import { ErrorHandler } from "./handlers/ErrorHandler";
import { LoggingRequestInterceptor, LoggingResponseInterceptor } from "./interceptors/logging";
import { LocalisationRequestInterceptor } from "./interceptors/localization";

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom
 * */
export const handler = SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    ShowRadarIntentHandler,
    ReadWeatherReportIntentHandler,
    PlayWeatherReportIntentHandler,
    PauseAudioIntentHandler,
    ResumeAudioIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler,
    FallbackIntentHandler,
    IntentReflectorHandler
  )
  .addErrorHandlers(ErrorHandler)
  .addRequestInterceptors(
    LoggingRequestInterceptor,
    LocalisationRequestInterceptor
  )
  .addResponseInterceptors(LoggingResponseInterceptor)
  .withApiClient(new DefaultApiClient())
  .lambda();
