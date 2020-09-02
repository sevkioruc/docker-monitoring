const express = require('express');
const bodyParser = require('body-parser');
var exec = require('child_process').exec;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods','GET, POST, PATCH, PUT, DELETE, OPTIONS');
  next();
});


app.get('/api/get', (req, res, next) => {
  exec('node --version', 'utf8', (err, stdout, stderr) => {
    console.log(stdout);
  })
  res.status(200).send();
});

module.exports = app;
