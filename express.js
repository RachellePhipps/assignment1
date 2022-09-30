var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(bodyParser.json());

var fs = require('fs');


var tweetinfo = []


fs.readFile('favs.json', 'utf8', function readFileCallback(err,data ){
  if(err){
    req.log.info('cannot load a file:' + fileFolder + '/' + _file_name)
    throw err;
  }
  else{
   tweetinfo = JSON.parse(data);
  }
});
 

//---------------------------------


//Get functions
//Shows 
app.get('/tweets', function(req, res) {
  res.send({tweets: tweetinfo});
});

//Shows tweet info
app.get('/tweetinfo', function(req, res) {
  res.send({tweets: tweetinfo});
});

//Shows searched tweets 
app.get('/searchinfo', function(req, res){
  res.send({tweets: tweetinfo});

});

//---------------------------------


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


//---------------------------------


//Update 5.
app.put('/tweets/:oldSName', function(req, res) {
  //TODO: update tweets
    var name = req.params.oldSName;
    var newName = req.body.newName;

    var found = false;

    //iterate over tweets
    tweets.forEach(function(tweet, index){
      if (!found && tweet.user.screen_name == oldSName){
          tweet.name = newName;
      }
    });

    res.send('updated tweet');
});


//---------------------------------

//Delete  6.
app.delete('/tweetinfo/:tweetid', function(req, res) {
  //TODO: delete a tweet

    var tweetID = req.params.tweetid;

    var found = false;
    
    tweets.forEach(function(tweet, index) {
        if (!found && tweet.id == tweetID) {
          tweets.splice(index, 1);
        }
    });
     console.log('Deleted');
});


//---------------------------------

app.listen(PORT, function() {
  console.log('Server listening on ' + PORT);
});