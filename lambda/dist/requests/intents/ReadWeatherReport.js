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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadWeatherReportIntentHandler = void 0;
const ask_sdk_core_1 = require("ask-sdk-core");
const utils_1 = require("../../utils");
const constants_1 = require("../../constants");
const utils_2 = require("../../model/report/utils");
const report_viewer_1 = require("../../view/report-viewer");
const utils_3 = require("../../view/utils");
exports.ReadWeatherReportIntentHandler = {
    canHandle(handlerInput) {
        return ((0, ask_sdk_core_1.getRequestType)(handlerInput.requestEnvelope) === "IntentRequest" &&
            (0, ask_sdk_core_1.getIntentName)(handlerInput.requestEnvelope) === "ReadWeatherReportIntent");
    },
    handle(handlerInput) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // call the progressive response service
                yield (0, utils_1.callDirectiveService)(handlerInput, handlerInput.t("PROGRESSIVE_MSG"));
            }
            catch (error) {
                // if it fails we can continue, but the user will wait without progressive response
                console.log(`Progressive response directive error: ${String(error)}`);
            }
            const reportEntryObj = yield (0, utils_2.getReportObj)(constants_1.REPORT_ENTRY.veneto);
            if (reportEntryObj === undefined) {
                return handlerInput.responseBuilder
                    .speak(handlerInput.t("ERROR_MSG"), constants_1.PLAY_BEHAVIOR.replaceAll)
                    .reprompt(handlerInput.t("REPROMPT_MSG"))
                    .getResponse();
            }
            if ((0, utils_3.supportsAPL)(handlerInput)) {
                const viewDirective = (0, report_viewer_1.buildReportViewer)(handlerInput, reportEntryObj);
                handlerInput.responseBuilder.addDirective(viewDirective);
            }
            const reportSpeech = (0, report_viewer_1.parseReportObjToSpeech)(handlerInput, reportEntryObj);
            return handlerInput.responseBuilder
                .speak(reportSpeech, constants_1.PLAY_BEHAVIOR.replaceAll)
                .reprompt(handlerInput.t("REPROMPT_MSG"))
                .getResponse();
        });
    },
};
//# sourceMappingURL=ReadWeatherReport.js.map