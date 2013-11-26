
/**
 * Module dependencies.
 */

var express = require('express');
// var routes = require('./routes');
// var user = require('./routes/user');
var http = require('http');
var path = require('path');
var hbs = require('hbs');
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('mongodb://happendbuser:happendbuser@ds053958.mongolab.com:53958/heroku_app19530200');

var app = express();


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', hbs.__express);

app.use(express.bodyParser());
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));



// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// hbs code

var blocks = {};

hbs.registerHelper('extend', function(name, context) {
    var block = blocks[name];
    if (!block) {
        block = blocks[name] = [];
    }

    block.push(context.fn(this)); // for older versions of handlebars, use block.push(context(this));
});

hbs.registerHelper('block', function(name) {
    var val = (blocks[name] || []).join('\n');

    // clear the block
    blocks[name] = [];
    return val;
});


// app.get('/', routes.index);

app.get('/', function(req, res){
	res.render('index.html');
})

app.get('/faq', function(req, res){
    res.render('faq');
})

app.get('/privacy', function(req, res){
    res.render('privacy');
})

app.get('/forgot', function(req,res){
    res.render('forgot');
})

app.post('/subscribe', function(req, res){
    var collection = db.get('subscribe');
    collection.insert({ 'email': req.body.user.email,'mobile_platform': req.body.user.mobile_platform }, function (err, doc) {
        if (err) {
            console.log('Sorry, there is some error.');
        } else {
            res.render('index', {msg : 'Thank you for your interest. you\'ve been added to our beta program.'})
        };
    });
    res.send
})

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
