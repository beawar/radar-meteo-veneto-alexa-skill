const util = require('./util');


function fetchRadar() {
    const requests = [];
    for (let i=6; i>0; i--) {
        const url = `https://www.arpa.veneto.it/bollettini/meteo/radar/imgs/teolo/${i}_BASE.jpg`;
        requests.push(url)
    }
    return requests;
    
}

module.exports = {
    fetchRadar
}