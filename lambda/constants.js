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
    }
}