const axios = require('axios');
const util = require('./util');


function fetchRadar() {
    const requests = [];
    for (let i=1; i<=6; i++) {
        const url = `https://www.arpa.veneto.it/bollettini/meteo/radar/imgs/teolo/${i}_BASE.jpg`;
        requests.push(url)
    }
    return requests;
    
}

module.exports = {
    fetchRadar
}