var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(bodyParser.json());

var fs = require('fs');
var tweetinfo = [];
var searchedtweets = [];


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
  res.send({tweets: tweetinfo, searchedTweets: searchedtweets});
  //^^ this gets a single tweet in the big array and like posts it
});

//---------------------------------

//Post functions
//Posts created tweets 
app.post('/tweetinfo/:newID', function(req, res) {
  //TODO: create a tweet.
    var newid = Number(req.params.newID);
    var newtext = req.body.newtxt;

  tweetinfo.push({
    "id": newid,
    "text": newtext });
});

//Posts searched tweets
app.post('/searchinfo', function(req, res) {
  
  //var foundTweet = req.body.foundTweet;

  var newid = Number(req.body.foundID);
  var newCA = req.body.foundCA;
  var newtext = req.body.foundtext;

  searchedtweets.push({
    "id": newid,
    "text": newtext,
    "created_at": newCA
  });

});


//---------------------------------


//Update 5. DONE HAH!
app.put('/tweets/:oldSName', function(req, res) {
  //TODO: update tweets
    var name = req.params.oldSName;
    var newName = req.body.newName;
    var found = false;
    //iterate over tweets
    tweetinfo.forEach(function(tweet, index) {
      if (!found && tweet.user.screen_name == name){
          tweet.user.screen_name = newName;
      }
    });

    res.send('updated tweet');
});


//---------------------------------

//Delete  6.
app.delete('/tweetinfo/:tweetid', function(req, res) {

  var ID = req.params.tweetid;

  var found = false;

  
  tweetinfo.forEach(function(tweet, index) {
    if (!found && tweet.id === Number(ID)) {
        tweetinfo.splice(index, 1);
    }
  });

});
//---------------------------------

app.listen(PORT, function() {
  console.log('Server listening on ' + PORT);
});
