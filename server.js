const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const {EventResponse} = require('./models/response');

const PORT = 3000;
mongoose.connect("mongodb://localhost:27017/rsvp", {useNewUrlParser: true});

const app = express();
// organized top/down so order is important//
app.set('view engine', 'pug');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.render('index', {title: "Event Reservation", h1: "Please confirm your attendance"});
});

app.post('/reply', (req, res) => {
    console.log(req.body);
    const eventResponse = new EventResponse({
        name: req.body.name,
        email: req.body.email,
        attending: req.body.attendance,
        guestCount: req.body.guestCount
    });

    eventResponse.save().then(() => {
        res.render('reply', {title: "Thank you", h1: "Thank you for your response!"});
    }).catch((err) => {
        res.status(400).send(err);
    });
});

app.get('/guests', (req, res) => {
    EventResponse.find().then((eventResponses) => {
        const attending = eventResponses.filter(eventResponse => eventResponse.attending)
                .map(eventResponse => eventResponse.name);
        const notAttending = eventResponses.filter(eventResponse => !eventResponse.attending)
                .map(eventResponse => eventResponse.name);
        
        res.render('guests', {title: "Guests", h1:"Guests Statuses", attending, notAttending});
    })
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
