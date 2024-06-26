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
exports.getReportObj = exports.fetchReport = exports.findReportEntry = exports.parseReportXmlToObj = void 0;
const cross_fetch_1 = __importDefault(require("cross-fetch"));
const constants_1 = require("../../constants");
const utils_1 = require("../../utils");
function parseReportXmlToObj(reportXml) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield (0, utils_1.parseXml)(reportXml);
        }
        catch (error) {
            console.error(error);
            return undefined;
        }
    });
}
exports.parseReportXmlToObj = parseReportXmlToObj;
function findReportEntry(reportObj, entryId) {
    return reportObj.previsioni.bollettini.bollettino.find((bollettino) => bollettino._bollettinoid === entryId);
}
exports.findReportEntry = findReportEntry;
function fetchReport() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield (0, cross_fetch_1.default)(constants_1.REPORT_XML_URL);
            return yield response.text();
        }
        catch (error) {
            console.log(error);
            return null;
        }
    });
}
exports.fetchReport = fetchReport;
function getReportObj(reportEntryId) {
    return __awaiter(this, void 0, void 0, function* () {
        const reportText = yield fetchReport();
        if (reportText) {
            const reportObj = yield parseReportXmlToObj(reportText);
            return reportObj && findReportEntry(reportObj, reportEntryId);
        }
        return undefined;
    });
}
exports.getReportObj = getReportObj;
//# sourceMappingURL=utils.js.map