import type { RequestHandler } from "ask-sdk-core";
import type { SessionEndedRequest } from "ask-sdk-model";

export const SessionEndedRequestHandler: RequestHandler  = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`Session ended with reason: ${(handlerInput.requestEnvelope.request as SessionEndedRequest).reason}`);

        return handlerInput.responseBuilder.getResponse();
    },
};