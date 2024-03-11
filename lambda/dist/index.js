"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const ask_sdk_core_1 = require("ask-sdk-core");
const Launch_1 = require("./requests/Launch");
const ShowRadar_1 = require("./requests/intents/ShowRadar");
const ReadWeatherReport_1 = require("./requests/intents/ReadWeatherReport");
const Help_1 = require("./requests/intents/Help");
const CancelAndStop_1 = require("./requests/intents/CancelAndStop");
const SessionEnded_1 = require("./requests/SessionEnded");
const Fallback_1 = require("./requests/intents/Fallback");
const IntentReflector_1 = require("./requests/IntentReflector");
const ErrorHandler_1 = require("./handlers/ErrorHandler");
const logging_1 = require("./interceptors/logging");
const localization_1 = require("./interceptors/localization");
const Repeat_1 = require("./requests/intents/Repeat");
/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom
 * */
exports.handler = ask_sdk_core_1.SkillBuilders.custom()
    .addRequestHandlers(Launch_1.LaunchRequestHandler, Repeat_1.RepeatIntentHandler, ShowRadar_1.ShowRadarIntentHandler, ReadWeatherReport_1.ReadWeatherReportIntentHandler, Help_1.HelpIntentHandler, CancelAndStop_1.CancelAndStopIntentHandler, SessionEnded_1.SessionEndedRequestHandler, Fallback_1.FallbackIntentHandler, IntentReflector_1.IntentReflectorHandler)
    .addErrorHandlers(ErrorHandler_1.ErrorHandler)
    .addRequestInterceptors(logging_1.LoggingRequestInterceptor, localization_1.LocalisationRequestInterceptor)
    .addResponseInterceptors(logging_1.LoggingResponseInterceptor)
    .withApiClient(new ask_sdk_core_1.DefaultApiClient())
    .lambda();
//# sourceMappingURL=index.js.map