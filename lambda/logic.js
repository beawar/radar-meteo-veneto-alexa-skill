const util = require('./util');
const axios = require('axios');


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

function parseReportToSpeech(reportXml, handlerInput) {
    return util.parseXml(reportXml)
    .then((reportObj) => {
        const bollettino = reportObj.previsioni.bollettini[0].bollettino.find((bollettino) => bollettino['$'].bollettinoid === 'MV');
        let speechText = util.buildSentence(`${handlerInput.t('REPORT_GENERAL')}:`, bollettino.evoluzionegenerale[0]); 
        if (bollettino.avviso[0]) {
            speechText += util.buildSentence(`${handlerInput.t('REPORT_ALLARM')}:`, bollettino.avviso[0]);
        }
        if (bollettino.fenomeniparticolari[0]) {
            speechText += util.buildSentence(`${handlerInput.t('REPORT_PARTICULAR_PHENOMENA')}:`, bollettino.fenomeniparticolari[0]);
        }
        speechText += util.buildParagraph(util.buildSentence(`${handlerInput.t('REPORT_TODAY')}:`), util.buildSentence(bollettino.giorno[0].text));
        return speechText;
    })
    .catch((error) => {
        console.error(error);
        return handlerInput.t('API_ERROR_MSG')
    });
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

module.exports = {
    fetchRadar,
    fetchAudio,
    fetchReport,
    parseReportToSpeech
}