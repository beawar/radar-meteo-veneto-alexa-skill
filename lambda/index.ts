import {
  DefaultApiClient,
  SkillBuilders,
} from "ask-sdk-core";
import { LaunchRequestHandler } from "./src/handlers/launch";
import { ShowRadarIntentHandler } from "./src/handlers/show-radar";
import { ReadWeatherReportIntentHandler } from "./src/handlers/read-weather";
import { PlayWeatherReportIntentHandler } from "./src/handlers/play-weather";
import { PauseAudioIntentHandler } from "./src/handlers/pause-audio";
import { ResumeAudioIntentHandler } from "./src/handlers/resume-audio";
import { HelpIntentHandler } from "./src/handlers/help";
import { CancelAndStopIntentHandler } from "./src/handlers/cancel";
import { SessionEndedRequestHandler } from "./src/handlers/session";
import { FallbackIntentHandler } from "./src/handlers/fallback";
import { IntentReflectorHandler } from "./src/handlers/reflector";
import { ErrorHandler } from "./src/handlers/error";
import { LoggingRequestInterceptor, LoggingResponseInterceptor } from "./src/interceptors/logging";
import { LocalisationRequestInterceptor } from "./src/interceptors/localization";

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
