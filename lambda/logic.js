const axios = require('axios');
const util = require('./util');


function fetchRadar() {
    const requests = [];
    for (let i=1; i<=6; i++) {
        const url = `https://www.arpa.veneto.it/bollettini/meteo/radar/imgs/teolo/${i}_BASE.jpg`;
        // var config = {
            // timeout: 6500 // timeout api call before we reach Alexa's 8 sec timeout, or set globally via axios.defaults.timeout
        // };
        //requests.push(axios.get(url, config));
        requests.push(url)
    }
    // return Promise.all(requests).then((result) => {
    //     return result;
    // }).catch((error) => {
    //     return error;
    // });
    return requests;
    
}

module.exports = {
    fetchRadar
}