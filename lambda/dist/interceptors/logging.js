"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggingResponseInterceptor = exports.LoggingRequestInterceptor = void 0;
// This request interceptor will log all incoming requests to this lambda
exports.LoggingRequestInterceptor = {
    process(handlerInput) {
        console.log(`Incoming request: ${JSON.stringify(handlerInput.requestEnvelope)}`);
    },
};
// This response interceptor will log all outgoing responses of this lambda
exports.LoggingResponseInterceptor = {
    process(_handlerInput, response) {
        console.log(`Outgoing response: ${JSON.stringify(response)}`);
    },
};
//# sourceMappingURL=logging.js.map