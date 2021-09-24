const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Alex'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Alex'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helptxt: 'This is some helpful text',
        name: 'Alex'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.search
    if (!address) {
        return res.send({
            error: 'You must provide an address'
        })
    } 
    geocode(address, (error, {latitude, longtitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }

        forecast(latitude, longtitude, (error, forecastData) => {
            if (error) {error
                return res.send({ error })
        }

        res.send({
            forecast: forecastData,
            location,
            address
        })
                
    })
})

    // res.send({
    //     forecast: 'It is snowing',
    //     location: 'Philadelphia',
    //     address
    // })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Alex',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Alex',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})