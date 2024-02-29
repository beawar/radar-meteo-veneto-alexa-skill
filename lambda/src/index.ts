import {
  DefaultApiClient,
  SkillBuilders,
} from "ask-sdk-core";
import { LaunchRequestHandler } from "./handlers/launch";
import { ShowRadarIntentHandler } from "./handlers/show-radar";
import { ReadWeatherReportIntentHandler } from "./handlers/read-weather";
import { PlayWeatherReportIntentHandler } from "./handlers/play-weather";
import { PauseAudioIntentHandler } from "./handlers/pause-audio";
import { ResumeAudioIntentHandler } from "./handlers/resume-audio";
import { HelpIntentHandler } from "./handlers/help";
import { CancelAndStopIntentHandler } from "./handlers/cancel";
import { SessionEndedRequestHandler } from "./handlers/session";
import { FallbackIntentHandler } from "./handlers/fallback";
import { IntentReflectorHandler } from "./handlers/reflector";
import { ErrorHandler } from "./handlers/error";
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
