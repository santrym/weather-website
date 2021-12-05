const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

console.log(__dirname);
console.log(path.join(__dirname, '../', '/public'));

// test

const app = express();

// Define the paths for the express configs
const pubDirPath = path.join(__dirname, '../', '/public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(pubDirPath));


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Mike Santry'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Mike Santry'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: "Mike Santry",
        help_message: "Hey man. I'm super sorry to hear about the problems you have been having, I really am. I just hope you don't think I'm a bad friend or anything. Take care, bud."
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Error',
        name: 'Mike Santry',
        error_message: 'Sorry duder, but the help page you are looking for is not here. Total bummer, trust me I know bruh. We have all been there dudeski'
    });
})

app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({
            error: "you must provide an address"
        })
    }

    // get geocode using the address given
    geocode(req.query.address, (err, dataGeo = {}) => {
        
        if(err){
            return res.send({error: err});
        }
        
        forecast(dataGeo.longitude,dataGeo.latitude, (err, dataFore) => {
            
            if(err){
                return res.send({error: err});
            }

            let weatherJSON = {
                forecast: dataFore,
                location: dataGeo.location,
                address: req.query.address
        
            };

            return res.send(weatherJSON);

        })
    });

});


app.get('/products', (req, res) => {

    if(!req.query.search){
        return res.send({
            error: "you must provide a search term."
        });
    }

    console.log(req.query.games);
    res.send({
        products: []
    });
})


app.get('*', (req, res) => {
    res.render('error', {
        title: 'Error',
        name: 'Mike Santry',
        error_message: "sorry dude, but we don't know wtf you are looking for. Better luck next year, chief. Smell ya later."
    });
});


app.listen(3000, () => {
    console.log('Server is up on port 3000');
});
