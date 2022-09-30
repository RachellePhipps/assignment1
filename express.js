var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(bodyParser.json());

var fs = require('fs');


//global variable for tweet data
var tweetinfo = []

//ID, TEXT, name, screen_name, created at

//load the input file
fs.readFile('favs.json', 'utf8', function readFileCallback(err,data ){
  if(err){
    req.log.info('cannot load a file:' + fileFolder + '/' + _file_name)
    throw err;
  }
  else{
    //TODO: store loaded data into a global variable for tweet data
    //tweetinfo = data;
   tweetinfo = JSON.parse(data);
  }
});
 

//Get functions
//Shows 
app.get('/tweets', function(req, res) {
  //TODO: send all users' IDs
  res.send({tweets: tweetinfo});
});

//Shows tweet info
app.get('/tweetinfo', function(req, res) {
  //TODO: send tweet info
  res.send({tweets: tweetinfo});
});

//Shows searched tweets 
app.get('/searchinfo', function(req, res){
  //TODO: send searched tweets
  res.send({tweets: tweetinfo});

});

//Post functions
//Posts created tweets 
app.post('/tweetinfo', function(req, res) {
  //TODO: create a tweet.
        res.send('make new tweet');

});

//Posts searched tweets
app.post('/searchinfo', function(req, res) {
  //TODO: search a tweet
});

//Update 5.
app.put('/tweets/:nm', function(req, res) {
  //TODO: update tweets
    //grab nm
    var name = req.params.nm;
    var newName = req.body.newName;

 var found = false;

    //iterate over tweets
    tweets.forEach(function(tweet, name){
      if (!found && tweet.name == name){
          tweet.name = newName;
      }
    });

    res.send('updated tweet');
});

//Delete  6.
app.delete('/tweetinfo/:tweetid', function(req, res) {
  //TODO: delete a tweet

    var tweetid = req.params.id;

    var found = false;

    tweets.forEach(function(tweet, index) {
        if (!found && tweet.id == tweetid) {
          tweets.splice(index, 1);
        }
    });
      res.send('deleted');
});

app.listen(PORT, function() {
  console.log('Server listening on ' + PORT);
});