"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const ask_sdk_core_1 = require("ask-sdk-core");
const launch_1 = require("./handlers/launch");
const show_radar_1 = require("./handlers/show-radar");
const read_weather_1 = require("./handlers/read-weather");
const play_weather_1 = require("./handlers/play-weather");
const pause_audio_1 = require("./handlers/pause-audio");
const resume_audio_1 = require("./handlers/resume-audio");
const help_1 = require("./handlers/help");
const cancel_1 = require("./handlers/cancel");
const session_1 = require("./handlers/session");
const fallback_1 = require("./handlers/fallback");
const reflector_1 = require("./handlers/reflector");
const error_1 = require("./handlers/error");
const logging_1 = require("./interceptors/logging");
const localization_1 = require("./interceptors/localization");
/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom
 * */
exports.handler = ask_sdk_core_1.SkillBuilders.custom()
    .addRequestHandlers(launch_1.LaunchRequestHandler, show_radar_1.ShowRadarIntentHandler, read_weather_1.ReadWeatherReportIntentHandler, play_weather_1.PlayWeatherReportIntentHandler, pause_audio_1.PauseAudioIntentHandler, resume_audio_1.ResumeAudioIntentHandler, help_1.HelpIntentHandler, cancel_1.CancelAndStopIntentHandler, session_1.SessionEndedRequestHandler, fallback_1.FallbackIntentHandler, reflector_1.IntentReflectorHandler)
    .addErrorHandlers(error_1.ErrorHandler)
    .addRequestInterceptors(logging_1.LoggingRequestInterceptor, localization_1.LocalisationRequestInterceptor)
    .addResponseInterceptors(logging_1.LoggingResponseInterceptor)
    .withApiClient(new ask_sdk_core_1.DefaultApiClient())
    .lambda();
