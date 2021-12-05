const request = require('postman-request');


const forecast = (lat, long, callback) => {

    let url = 'http://api.weatherstack.com/current?access_key=cc8641a911f112425a8a36a08339a831&query=' + long + ',' + lat + '&units=f';
    let weatherData = '';
    
    request({ url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather service!');
        } else if(body.error){
            callback('Unable to find location!');
        } else{   
            weatherData = body.current;
            const {weather_descriptions:weatherDesc, temperature, feelslike: feels} = weatherData;
            let retString = 'It is ' + weatherDesc[0] + ' outside. ';
            retString += "The temperature is " + temperature + ' degrees, but it feels like ' + feels + '.'
            callback(undefined, retString);
        }
    });

};



module.exports = forecast;