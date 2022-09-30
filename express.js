var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(bodyParser.json());

var fs = require('fs');
var tweetinfo = [];
var searchedtweets = [];


//reads favs.json file and put into tweetinfo array
fs.readFile('favs.json', 'utf8', function readFileCallback(err,data ){
  if(err){
    req.log.info('cannot load a file:' + fileFolder + '/' + _file_name)
    throw err;
  }
  else{
    //parse and store into tweetinfo
   tweetinfo = JSON.parse(data);
  }
});
 
/*
  GET ---
*/

//sends tweetinfo for Users' ID 
app.get('/tweets', function(req, res) {
  //sends tweetinfo as "tweets"
  res.send({tweets: tweetinfo});
});

//sends tweetinfo for getting all tweets
app.get('/tweetinfo', function(req, res) {
  res.send({tweets: tweetinfo});
});

//Gets and sends tweetinfo and already known searchedtweets arrays
app.get('/searchinfo', function(req, res){
  res.send({tweets: tweetinfo, searchedTweets: searchedtweets});
});

/*
  POST ---
*/

//Post that receives the new id and text next and then pushes a new tweet
app.post('/tweetinfo/:newID', function(req, res) {
  //get new id and text
    var newid = Number(req.params.newID);
    var newtext = req.body.newtxt;

  //push new tweet to tweetinfo
  tweetinfo.push({
    "id": newid,
    "text": newtext });
});

//Post that receives the id, created_at, and text of the searched tweet
//the tweet is then put into searchedtweets
app.post('/searchinfo', function(req, res) {
  
  //create vars
  var newid = Number(req.body.foundID);
  var newCA = req.body.foundCA;
  var newtext = req.body.foundtext;

  //push searched tweet into searchedtweets
  searchedtweets.push({
    "id": newid,
    "text": newtext,
    "created_at": newCA
  });
});


/*
  PUT ---
*/

//Update a sceen_name with a given new name
//Receives the old name and iterates over tweets until a match is found to replace
app.put('/tweets/:oldSName', function(req, res) {
  //new vars
    var name = req.params.oldSName;
    var newName = req.body.newName;
    var found = false;
    
    //iterate over tweets
    tweetinfo.forEach(function(tweet, index) {
      if (!found && tweet.user.screen_name == name){
        //replace old with new
          tweet.user.screen_name = newName;
      }
    });
    res.send('updated tweet');
});

/*
    DELETE ---
*/

//Delete a tweet given ID
app.delete('/tweetinfo/:tweetid', function(req, res) {
  //receive ID
  var ID = req.params.tweetid;
  var found = false;

  //iterate until a match with the ID is found, then splice "remove" it  
  tweetinfo.forEach(function(tweet, index) {
    if (!found && tweet.id === Number(ID)) {
      //remove matched ID tweet
        tweetinfo.splice(index, 1);
    }
  });
});

app.listen(PORT, function() {
  console.log('Server listening on ' + PORT);
});
