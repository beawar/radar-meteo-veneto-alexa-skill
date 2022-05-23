module.exports = {
    // APL documents
    APL: {
        radarPlayer: {
            document: require('./documents/radarPlayer.json'),
            token: 'radarPlayerToken'
        }
    },
    PlayBehavior: {
        ENQUEUE: 'ENQUEUE',
        REPLACE_ALL: 'REPLACE_ALL',
        REPLACE_ENQUEUED: 'REPLACE_ENQUEUED'
    },
    DetailedAudioWeatherReport: {
        "type": "AudioPlayer.Play",
        "audioItem": {
            "stream": {
                "url": 'https://www.arpa.veneto.it/previsioni/audio/meteoveneto.mp3',
                "token": "audioPlayerToken",
                "offsetInMilliseconds": 0,
            },
            "metadata": {
                "title": "Bollettino dettagliato veneto"
            }
        }
    },
    BasicAudioWeatherReport: {
        "type": "AudioPlayer.Play",
        "audioItem": {
            "stream": {
                "url": 'https://www.arpa.veneto.it/previsioni/audio/meteoradio.mp3',
                "token": "radioPlayerToken",
                "offsetInMilliseconds": 0,
            },
            "metadata": {
                "title": "Bollettino radio veneto"
            }
        }
    }
}