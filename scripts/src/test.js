const logic = require('./logic');
const i18n = require('i18next');
const languageStrings = require('./localisation');

const localisationClient = i18n.init({
    lng: 'it',
    resources: languageStrings,
    returnObjects: true
});
localisationClient.localise = function localise() {
    const args = arguments;
    const value = i18n.t(...args);
    if (Array.isArray(value)) {
        return value[Math.floor(Math.random() * value.length)];
    }
    return value;
};
function translate(...args) {
    return localisationClient.localise(...args);
}

logic.fetchReport()
.then((report) => logic.parseReportToSpeech(report, { t: translate }))
.then((speech) => console.log(speech))
.catch((error) => console.error(error));
