"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepeatIntentHandler = void 0;
const ask_sdk_core_1 = require("ask-sdk-core");
exports.RepeatIntentHandler = {
    canHandle(handlerInput) {
        return ((0, ask_sdk_core_1.getRequestType)(handlerInput.requestEnvelope) === "IntentRequest" &&
            (0, ask_sdk_core_1.getIntentName)(handlerInput.requestEnvelope) === "AMAZON.RepeatIntent");
    },
    handle(handlerInput) {
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes();
        const lastResponse = (typeof sessionAttributes["lastResponse"] === "string" &&
            sessionAttributes["lastResponse"]) ||
            handlerInput.t("NOTHING_TO_REPEAT");
        return handlerInput.responseBuilder
            .speak(lastResponse)
            .reprompt(lastResponse)
            .getResponse();
    },
};
//# sourceMappingURL=Repeat.js.map