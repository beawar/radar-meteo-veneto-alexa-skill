const util = require('./util');
const axios = require('axios');

module.exports = {
    fetchRadar(){
        const requests = [];
        // for (let i=1; i<=6; i++) {
            // const url = `https://www.arpa.veneto.it/bollettini/meteo/radar/imgs/teolo/${i}_BASE.jpg`;
            //  var config = {
            //     timeout: 6500 // timeout api call before we reach Alexa's 8 sec timeout, or set globally via axios.defaults.timeout
            //     // headers: {'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8'}
            // };
            // requests.push(axios.get(url, config));
        // }
        
                // return Promise.all(requests).then((result) => {
        //     return result;
        // }).catch((error) => {
        //     return error;
        // });
        
        const url = `https://www.arpa.veneto.it/bollettini/meteo/radar/imgs/teolo/1_BASE.jpg`
        const config = { timeout: 6500 };
        return axios.get(url, config)
        .then((result) => [result])
        .catch((error) => {
            console.log('Error fetching 1_BASE', error);
            return error;
            
        });
        
    }
}