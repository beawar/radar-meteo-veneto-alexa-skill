const Alexa = require('ask-sdk-core');
const handlers = require('./handlers');
const interceptors = require('./interceptors');

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        handlers.LaunchRequestHandler,
        handlers.ShowRadarIntentHandler,
        handlers.ReadWeatherReportIntentHandler,
        handlers.PlayWeatherReportIntentHandler,
        handlers.PauseAudioIntentHandler,
        handlers.ResumeAudioIntentHandler,
        handlers.HelpIntentHandler,
        handlers.CancelAndStopIntentHandler,
        handlers.SessionEndedRequestHandler,
        handlers.FallbackIntentHandler,
        handlers.IntentReflectorHandler)
    .addErrorHandlers(handlers.ErrorHandler)
    .addRequestInterceptors(
        interceptors.LoggingRequestInterceptor,
        interceptors.LocalisationRequestInterceptor)
    .addResponseInterceptors(
        interceptors.LoggingResponseInterceptor)
    .withApiClient(new Alexa.DefaultApiClient())
    .lambda();