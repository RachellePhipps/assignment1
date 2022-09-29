var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(bodyParser.json());

var fs = require('fs');


//global variable for tweet data
var tweetinfo = [

{
  id:1,
  name: 'person1'

},

{
  id: 2,
  name: 'person2'

}


];
//9:03

//load the input file
fs.readFile('favs.json', 'utf8', function readFileCallback(err,data ){
  if(err){
    req.log.info('cannot load a file:' + fileFolder + '/' + _file_name)
    throw err;
  }
  else{
    //TODO: store loaded data into a global variable for tweet data
  }
});
 


//Get functions
//Shows user info
app.get('/tweets', function(req, res) {
  //TODO: send all users' IDs
  
//!!
res.send({tweetinfo: tweetinfo});


});

//Shows tweet info
app.get('/tweetinfo', function(req, res) {
  //TODO: send tweet info
});

//Shows searched tweets
app.get('/searchinfo', function(req, res){
  //TODO: send searched tweets

});

//Post functions
//Posts created tweets
app.post('/tweetinfo', function(req, res) {
  //TODO: create a tweet.
  
  var tweetName = req.body.name;
  currentId++;

tweetinfo.push({
  id: currentId,
  name: productName

});
res.send('Successfully created tweet!');

});

//Posts searched tweets
app.post('/searchinfo', function(req, res) {
  //TODO: search a tweet
});

//Update
app.put('/tweets/:nm', function(req, res) {
  //TODO: update tweets


  var nm = req.params.nm;
  var newid = req.params.id;

  var found = false;

  tweetinfo.forEach(function(tweet, index) {
    if (!found && tweet.name == nm) {
      tweet.id = newid;

    }
  });
  res.send('Successfully updated tweet!');
});

//Delete 
app.delete('/tweetinfo/:tweetid', function(req, res) {
  //TODO: delete a tweet
  var id = req.params.id;

  var found = false;

  tweet.forEach(function(tweet, index){
    if (!found && tweet.id === Number(id)){
      tweet.splice(index, 1);
    }
  });
  res.send('Successfully deleted tweet.');
});


app.listen(PORT, function() {
  console.log('Server listening on ' + PORT);
});