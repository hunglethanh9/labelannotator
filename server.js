var path = require('path');
const fs = require('fs');
var moment = require('moment');
const uuid = require('uuid/v1');

// set root path to a global variable
global.__basedir = path.join(__dirname);

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const {
  port,
  env,
  logs
} = require('./config/variables');
const error = require('./middlewares/error');

/**
 * Express instance
 * @public
 */
const app = express();

// request logging. dev: console | production: file
app.use(morgan(logs));

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// gzip compression
app.use(compress());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// Ping route
app.get('/ping', function (req, res) {
  res.send('pong');
});

app.get('/login', function (req, res) {
  var timeStamp = moment().add(24 * 60, 'minutes').format('X');
  var sessionKey = uuid();
  res.redirect(
    req.query.callback + '?session_key=' + sessionKey + '&expires=' + timeStamp
  );
});

app.get('/project', function (req, res) {
  let rawData = fs.readFileSync(__basedir + '/private/project');
  res.status(200).json(
    JSON.parse(rawData)
  );
});

app.get('/task', function (req, res) {
  let rawData = fs.readFileSync(__basedir + '/private/CRStudyWithUUID.json');
  res.status(200).json({
    images: JSON.parse(rawData)
  });
});

app.get('/generateJSON', function (req, res) {
  let rawData = fs.readFileSync(__basedir + '/private/CRStudy.json');
  let parsed = JSON.parse(rawData);
  for (var i = 0; i < parsed.seriesList.length; i++) {
    parsed.seriesList[i].seriesId = uuid();
    let instanceList = parsed.seriesList[i].instanceList;
    for (var j = 0; j < instanceList.length; j++) {
      parsed.seriesList[i].instanceList[j].instanceId = uuid();
    }
  }
  res.status(200).json(parsed);
})

if (env === 'development') {
  // Set public folder as root
  app.use(express.static('public'));

  // Redirect all traffic to index.html
  app.use((req, res) => res.sendFile(`${__dirname}/public/index.html`));
} else {
  // Set dist folder as root
  app.use(express.static('dist'));

  // Redirect all traffic to index.html
  app.use((req, res) => res.sendFile(`${__dirname}/dist/index.html`));
}

// if error is not an instanceOf APIError, convert it.
app.use(error.converter);

// catch 404 and forward to error handler
app.use(error.notFound);

// error handler, send stacktrace only during development
app.use(error.handler);

app.listen(port, () => console.info(`server started on port ${port} (${env})`));
