const express = require('express');
const bodyParser = require('body-parser');
const exec = require('child_process').exec;

const {getContainersAsJSON, getAllImagesAsJSON} = require('./utils/util');

const app = express();

const FORMAT="{{.ID}}:{{.Image}}:{{.Command}}:{{.RunningFor}}:{{.Status}}:{{.Names}}:{{.Ports}}:";
const imageFormat="{{.Repository}}:{{.Tag}}:{{.ID}}:{{.CreatedSince}}:{{.Size}}:";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods','GET, POST, PATCH, PUT, DELETE, OPTIONS');
  next();
});


app.get('/api/getAllContainers', (req, res) => {
  exec(`docker ps -a --format ${FORMAT}`, 'utf8', (err, stdout) => {
    const containerArray = getContainersAsJSON(stdout);
    res.status(200).json(containerArray);
  })
});

app.get('/api/removeContainer/:containerID', (req, res) => {
  exec(`docker container rm ${req.params.containerID}` , 'utf8', (err, stdout) => {
    res.status(200).json({containerID: stdout});
  })
});

app.get('/api/getAllImages', (req, res) => {
  exec(`docker image ls -a --format ${imageFormat}` , 'utf8', (err, stdout) => {
    const imageArray = getAllImagesAsJSON(stdout);
    res.status(200).json(imageArray);
  })
});

app.post('/api/runContainer', (req, res) => {
  const containerID = req.body.containerID;
  exec(`docker container start ${containerID}` , 'utf8', (err, stdout) => {
    res.status(200).json(stdout);
  })
});

app.post('/api/stopContainer', (req, res) => {
  const containerID = req.body.containerID;
  exec(`docker container stop ${containerID}` , 'utf8', (err, stdout) => {
    res.status(200).json(stdout);
  })
});

module.exports = app;
