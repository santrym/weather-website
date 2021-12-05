const request = require('postman-request');


const geocode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2FudHJ5bSIsImEiOiJja3diZzdkZTg3NXpuMzJtb3VpeHY5bW5pIn0.EZtXVoPqaXMkOmCVW5vfow&limit=1';

    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('unable to connect to location services!', undefined);
        } else if(body.features.length === 0){
            callback('Unable to find a location. Try another choice', undefined);
        } else{

            const {features: feats} = body;

            callback(undefined, {
                latitude: feats[0].center[0],
                longitude: feats[0].center[1],
                location: feats[0].place_name
            });
        }
    });

};


module.exports = geocode;
