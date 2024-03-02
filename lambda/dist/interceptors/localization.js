"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalisationRequestInterceptor = void 0;
const ask_sdk_core_1 = require("ask-sdk-core");
const i18n = __importStar(require("i18next"));
const localisation_1 = require("../i18n/localisation");
// This request interceptor will bind a translation function 't' to the handlerInput
// Additionally it will handle picking a random value if instead of a string it receives an array
exports.LocalisationRequestInterceptor = {
    process(handlerInput) {
        const getLocale = () => (0, ask_sdk_core_1.getLocale)(handlerInput.requestEnvelope);
        i18n.init({
            lng: getLocale(),
            resources: localisation_1.languageStrings,
            returnObjects: true
        });
        function localise(...args) {
            const value = i18n.t(...args);
            if (Array.isArray(value)) {
                return value[Math.floor(Math.random() * value.length)];
            }
            return value;
        }
        ;
        handlerInput.t = localise;
        handlerInput.getLocale = getLocale;
    }
};
//# sourceMappingURL=localization.js.map