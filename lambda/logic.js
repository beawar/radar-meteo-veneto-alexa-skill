const util = require('./util');
const axios = require('axios');
const { REPORT_ENTRY } = require('./constants');


function fetchRadar() {
    const requests = [];
    const timestamp = new Date().getTime();
    for (let i=6; i>0; i--) {
        const url = `https://www.arpa.veneto.it/bollettini/meteo/radar/imgs/teolo/${i}_BASE.jpg?${timestamp}`;
        requests.push(url)
    }
    return requests;
    
}

function fetchAudio(){
    const url = 'https://www.arpa.veneto.it/previsioni/audio/meteoveneto.mp3'
    return url;
}

function parseReportXmlToObj(reportXml, handlerInput) {
    return util.parseXml(reportXml)
    .catch((error) => {
        console.error(error);
        return handlerInput.t('API_ERROR_MSG')
    });
}

function findReportEntry(reportObj, entryId) {
    return reportObj.previsioni.bollettini[0].bollettino.find((bollettino) => bollettino['$'].bollettinoid === entryId);
}

function parseReportObjToSpeech(reportEntry, handlerInput) {
    let speechText = util.buildSentence(`${handlerInput.t('REPORT_GENERAL')}:`, reportEntry.evoluzionegenerale[0]); 
    if (reportEntry.avviso[0]) {
        speechText += util.buildSentence(`${handlerInput.t('REPORT_ALLARM')}:`, reportEntry.avviso[0]);
    }
    if (reportEntry.fenomeniparticolari[0]) {
        speechText += util.buildSentence(`${handlerInput.t('REPORT_PARTICULAR_PHENOMENA')}:`, reportEntry.fenomeniparticolari[0]);
    }
    speechText += util.buildParagraph(util.buildSentence(`${handlerInput.t('REPORT_TODAY')}:`), util.buildSentence(reportEntry.giorno[0].text));
    return speechText;
}

function fetchReport() {
    const url = 'https://www.arpa.veneto.it/previsioni/it/xml/bollettino_utenti.xml';
    return axios.get(url)
    .then((response) => {
        return response.data;
    })
    .catch((error) => {
        console.log(error);
        return null;
    });
}

async function getReportObj(handlerInput, reportEntryId) {
    return logic.fetchReport()
        .then((report) => parseReportXmlToObj(report, handlerInput))
        .then((reportObj) => findReportEntry(reportObj, reportEntryId));
}

module.exports = {
    fetchRadar,
    fetchAudio,
    fetchReport,
    parseReportXmlToObj,
    parseReportObjToSpeech,
    findReportEntry,
    getReportObj
}