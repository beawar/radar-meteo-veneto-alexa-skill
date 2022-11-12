module.exports = {
    // APL documents
    APL: {
        radarPlayer: {
            type: "Alexa.Presentation.APL.RenderDocument",
            document: {
                src: "doc://alexa/apl/documents/images-player",
                type: "Link"
            },
            token: 'radarPlayerToken'
        },
        reportViewer: {
            type: "Alexa.Presentation.APL.RenderDocument",
            document: {
                src: "doc://alexa/apl/documents/report-reader",
                type: "Link"
            },
            token: 'reportViewerToken'
        },
        audioPlayer: {
            type: "Alexa.Presentation.APL.RenderDocument",
            document: {
                src: "doc://alexa/apl/documents/audio-player",
                type: "Link"
            },
            token: "audioPlayerToken",
        }
    },
    PlayBehavior: {
        ENQUEUE: 'ENQUEUE',
        REPLACE_ALL: 'REPLACE_ALL',
        REPLACE_ENQUEUED: 'REPLACE_ENQUEUED'
    },
    DetailedAudioWeatherReport: {
        url: 'https://www.arpa.veneto.it/previsioni/audio/meteoveneto.mp3',
        title: "Bollettino dettagliato veneto"
         
    },
    BasicAudioWeatherReport: {
        src: 'https://www.arpa.veneto.it/previsioni/audio/meteoradio.mp3',
        title: "Bollettino radio veneto"
            
    },
    REPORT_ENTRY: {
        VENETO: 'MV',
        DOLOMITI: 'DM',
        PIANURA: 'MP'
    }
}