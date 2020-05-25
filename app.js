const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const fetch = require('node-fetch');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

var timeSeries = '';

const query = 'query{cases{countConfirmedCases,perDayConfirmed {value,date}}}';

fetch('https://ncovph.com/graphql', {
    method: 'POST',
    body: JSON.stringify({query}),
    headers: {
        'Content-Type': 'application/json'
    } 
})
.then(res => res.text())
.then(body => timeSeries = body)
.catch(error => console.error(error));


app.get("/", (req, res) => {
    let confirmedCasesCount =  JSON.parse(timeSeries).data.cases.countConfirmedCases;
    console.log(confirmedCasesCount);
    
    let timeSeriesJSON = JSON.parse(timeSeries).data.cases.perDayConfirmed;
    for (let i = 0; i < timeSeriesJSON.length; i++) {
    timeSeriesJSON[i]['y'] = timeSeriesJSON[i]['value'];
    delete timeSeriesJSON[i]['value'];
    timeSeriesJSON[i]['x'] = timeSeriesJSON[i]['date'];
    delete timeSeriesJSON[i]['date'];
    }

    res.render("index", {timeSeries: timeSeriesJSON, confirmedCasesCount: confirmedCasesCount});
});

app.route("/data")
.get((req, res) => {
    
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});