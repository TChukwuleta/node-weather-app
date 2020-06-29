const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&units=metric&appid=7391cee0d1028f3b33d7ac1471f48d7e'
    request({url, json:true}, (error, response) => {
        if (error){
            callback('Unable to connect to the weather services', undefined)
        } else if (response.body.error){
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, 'It is currently ' + response.body.main.temp + ' degrees out')
        }
    })
}

module.exports = forecast