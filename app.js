'use strict';
var express = require('express');
var ejsLayouts = require('express-ejs-layouts');


var app = express();

var port = process.env.PORT || 5000;
var startRouter = require('./src/routes/startRoutes');

app.use(express.static('public'));

app.set('views', './src/views');
app.set('view engine', 'ejs');
app.use(ejsLayouts);

app.use('/', startRouter);

app.listen(port, function (err) {
    console.log('running on port ' + port);
});