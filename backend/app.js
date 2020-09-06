const express = require('express');
const bodyParser = require('body-parser');
const exec = require('child_process').exec;

const {getAllContainersAsJSON, removeContainerWithID} = require('./utils/util');

const app = express();

const FORMAT="{{.ID}}:{{.Image}}:{{.Command}}:{{.RunningFor}}:{{.Status}}:{{.Names}}:{{.Ports}}:"

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods','GET, POST, PATCH, PUT, DELETE, OPTIONS');
  next();
});


app.get('/api/get', (req, res) => {
  exec(`docker ps -a --format ${FORMAT}`, 'utf8', (err, stdout) => {
    const containerArray = getAllContainersAsJSON(stdout);
    res.status(200).json(containerArray);
  })
});

app.get('/api/remove/:containerID', (req, res) => {
  exec(`docker container rm ${req.params.containerID}` , 'utf8', (err, stdout) => {
    res.status(200).json({containerID: stdout});
  })
});

module.exports = app;
