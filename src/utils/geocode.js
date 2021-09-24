const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic29sb2FsZWtvczU1IiwiYSI6ImNrdHN2ZGVscjFkeG4yb2w4amJ5aHVrZTkifQ.8AYTbkW_VEuTYxFTlQQWBg&limit=1&fuzzyMatch=false'

    request({ url, json: true }, (error, { body } ) => {
        if(error){
            callback('Unable to connect to location services!', undefined)
        } else if(body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longtitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode