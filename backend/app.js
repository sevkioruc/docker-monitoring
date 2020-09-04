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
  exec('sudo docker ps -a', 'utf8', (err, stdout, stderr) => {
    res.status(200).json({container:stdout});
  })
});

module.exports = app;
