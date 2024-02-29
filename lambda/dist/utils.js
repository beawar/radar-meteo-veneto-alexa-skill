"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildParagraph = exports.buildSentence = exports.parseXml = exports.callDirectiveService = void 0;
const he_1 = __importDefault(require("he"));
const xml2js_1 = __importDefault(require("xml2js"));
function callDirectiveService(handlerInput, msg) {
    var _a;
    // Call Alexa Directive Service.
    const { requestEnvelope } = handlerInput;
    const directiveServiceClient = (_a = handlerInput.serviceClientFactory) === null || _a === void 0 ? void 0 : _a.getDirectiveServiceClient();
    const requestId = requestEnvelope.request.requestId;
    // build the progressive response directive
    const directive = {
        header: {
            requestId,
        },
        directive: {
            type: "VoicePlayer.Speak",
            speech: msg,
        },
    };
    // send directive
    return directiveServiceClient === null || directiveServiceClient === void 0 ? void 0 : directiveServiceClient.enqueue(directive);
}
exports.callDirectiveService = callDirectiveService;
function parseXml(text) {
    return __awaiter(this, void 0, void 0, function* () {
        const decodedText = he_1.default.decode(text);
        return yield xml2js_1.default.parseStringPromise(decodedText, {
            trim: true,
            explicitArray: false,
            mergeAttrs: true,
            attrNameProcessors: [
                function addPrefix(name) {
                    return `_${name}`;
                },
            ],
        });
    });
}
exports.parseXml = parseXml;
function htmlToString(html) {
    return html ? html.replace(/(<([^>]+)>)/gi, "").replace(/\s+/gim, " ") : "";
}
function buildSentence(...str) {
    return ` <s>${htmlToString(str.join(" ").trim())}</s> `;
}
exports.buildSentence = buildSentence;
function buildParagraph(...str) {
    return ` <p>${str.join(" ").trim()}</p> `;
}
exports.buildParagraph = buildParagraph;
