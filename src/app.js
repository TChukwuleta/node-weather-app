const express = require('express')
const path = require('path')
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000
//Define paths for express config
const pathe = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')
//Setup Handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)
//set up static directory to serve
app.use(express.static(pathe))

app.get('', (request, response) => {
    response.render('index', {
        title: 'Weather App',
        name: 'Chukwuleta Tobechi'
    })
})
app.get('/about', (request, response) => {
    response.render('about', {
        title: 'About the Weather App',
        name: 'Eric Chileta'
    })
})
app.get('/help', (request, response) => {
    response.render('help', {
        helpText: 'This is some helpful text',
        title: 'Help for the Weather app',
        name: 'Chukwuleta Tobechi'
    })
})

app.get('/weather', (request, response) => {
    if (!request.query.address) {
        return response.send({
            error: 'You did not provide a valid address'
        })
    }
        geocode(request.query.address, (error, {latitude, longitude, location} = {}) => {
            if (error) {
                return response.send({
                    error
                })
            }
            forecast(latitude, longitude, (error, forcastData) => {
                if (error) {
                    return response.send({
                        error
                    })
                }
                response.send({
                    forecast: forcastData,
                    location,
                    address: request.query.address
                })
            })
        })
    // response.send([{
    //     forecast: 'It is 2 degrees out',
    //     location: 'Cloud 9',
    //     address: request.query.address
    // }])
})
app.get('/products', (request, response) => {
    if (!request.query.search) {
        response.send({
            error: 'You must provide a search term'
        })
    }
    response.send({
        products: []
    })
})
app.get('/help/*', (request, response) => {
    return response.render('elp-article', {
        name: 'Eric Chileta'
    })
})

app.get('*', (request, response) => {
    response.render('error', {
        name: 'Eric Chileta'
    })
})


app.listen(port, () => {
    console.log('Server is up on port' + port)
})