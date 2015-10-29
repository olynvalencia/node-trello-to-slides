'use strict';

var express = require('express');
var path = require('path');

// Express App
var app = express();
var args = {port: '8080'};

var PORT = Number(process.env.PORT || args.port);
var DIST_DIR = path.join(__dirname, '..', 'dist');

// Send static files from these directories
app.use('/lib', express.static(DIST_DIR + '/lib'));
app.use('/css', express.static(DIST_DIR + '/css'));
app.use('/js', express.static(DIST_DIR + '/js'));
app.use('/plugin', express.static(DIST_DIR + '/plugin'));

var router = express.Router();

// Send any other urls to the client app to load.
router.get('*', function(req, res) {
  res.sendFile(DIST_DIR + '/index.html');
});

app.use('/', router);

app.listen(PORT, function() {
  console.log('Server started at http://localhost:' + PORT);
});
