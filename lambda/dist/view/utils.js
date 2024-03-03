"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supportsAPLA = exports.supportsAPL = exports.buildDirective = void 0;
function assertDirective(directive) {
    if (typeof directive !== "object" || !directive) {
        throw new Error("directive must be an object");
    }
    if (!("token" in directive)) {
        throw new Error("directive must have a token");
    }
    if (!("document" in directive)) {
        throw new Error("directive must have a document");
    }
}
function buildDirective(directive, datasources) {
    const result = {
        type: directive.type,
        document: directive.document,
        token: directive.token,
        datasources,
    };
    assertDirective(result);
    return result;
}
exports.buildDirective = buildDirective;
function supportsAPL(handlerInput) {
    var _a;
    const supportedInterfaces = (_a = handlerInput.requestEnvelope.context.System.device) === null || _a === void 0 ? void 0 : _a.supportedInterfaces;
    return !!(supportedInterfaces === null || supportedInterfaces === void 0 ? void 0 : supportedInterfaces["Alexa.Presentation.APL"]);
}
exports.supportsAPL = supportsAPL;
function supportsAPLA(handlerInput) {
    return supportsAPL(handlerInput);
}
exports.supportsAPLA = supportsAPLA;
//# sourceMappingURL=utils.js.map