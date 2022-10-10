$(function() {
  
  /*
    GET ---
  */
  
  //Get all users' ID including screen name and name
  $('#get-button').on('click', function() {
      $.ajax({
          url: '/tweets',
          contentType: 'application/json',
          success: function(response){
            //on success, get namebody to print tweets with
              var tbodyEl = $(namebody);
              tbodyEl.html('');
              //iterate over tweets and print out each ID, screen_name and name
            response.tweets.forEach(function(tweet) {
              tbodyEl.append('\
              <tr>\
                <td class="user">' + tweet.id + '</td>\
                <td class="user">' + tweet.user.screen_name + '</td>\
                <td class="user">' + tweet.user.name + '</td>\
              </tr>\
              ');
            });
          }
      });
  });
  
   //get all tweets
   $('#get-tweets-button').on('click', function(){
       $.ajax({
        url: '/tweetinfo',
        contentType: 'application/json',
        success: function(response){
          //similar as #get-button above, iterate and print ID, text, and created_at
            var tbodyEl = $(tweetbody);
            tbodyEl.html('');
          response.tweets.forEach(function(tweet) {
            tbodyEl.append('\
            <tr>\
              <td class="user">' + tweet.id + '</td>\
              <td class="user">' + tweet.text + '</td>\
              <td class="user">' + tweet.created_at + '</td>\
            </tr>\
            ');
          });
        }
    });
   });

   //Get Recently tweets with searchedtweets
   $('#get-searched-tweets').on('click', function() {
      //similar as before, iterate over searchedtweets and output id, text, and created_at
      $.ajax({
        url: '/searchinfo',
        method: 'GET',
        contentType: 'application/json',
        success: function(response){
            var tbodyEl = $(searchbody);
            tbodyEl.html('');
            //iterate over searchedtweets
          response.searchedTweets.forEach(function(tweet) {
            tbodyEl.append('\
            <tr>\
              <td class="user">' + tweet.id + '</td>\
              <td class="user">' + tweet.text + '</td>\
              <td class="user">' + tweet.created_at + '</td>\
            </tr>\
            ');
          });
        }
      });
   });

/*
   CREATE ---
*/

//create a new tweet
   $('#create-form').on('submit', function(event){
    event.preventDefault();
    //get input of ID and text
    var createInput = $('#create-input');
    var inputString = createInput.val();
    //seperate based on ';'
    const parsedStrings = inputString.split(';');

    var newID = parsedStrings[0];
    var newTEXT = parsedStrings[1];

    $.ajax({
          //send ID through url
        url: '/tweetinfo/' + newID,
        method: 'POST',
        contentType: 'application/json',
            //pass text through data 
        data: JSON.stringify({newtxt : newTEXT}),
        success: function(response){
          console.log(response);
          createInput.val('');
        }
    });    
});

/*
  SEARCH --
*/

   //Search for a tweet when given ID
 $('#search-form').on('submit', function(event){
   event.preventDefault();
   //get inputed ID to search for
   var searchInp = $('#search-input');
   var userID =  searchInp.val();


    var found = false;

    $.ajax({
      url: '/searchinfo',
      method: 'GET',
      contentType: 'application/json',
      success: function(response) {
        var tbodyEl = $(searchbody);
        tbodyEl.html('');
        //similar as gets and look for the tweet with the same ID
        response.tweets.forEach(function(tweet) {
          if (!found && tweet.id === Number(userID)){
            //when found, print it out
          tbodyEl.append('\
          <tr>\
            <td class="user">' + tweet.id + '</td>\
            <td class="user">' + tweet.text + '</td>\
            <td class="user">' + tweet.created_at + '</td>\
          </tr>\
          ');

          //after printing out, pass to POST to put the tweet into searchedtweet
          $.ajax({
            url: '/searchinfo',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(({foundID: tweet.id, foundtext: tweet.text, foundCA: tweet.created_at})),
            success: function(response){
              console.log(response);
                 }   
            });
          }
        });
      }
    });
  });  


/*
  UPDATE --
*/

 //Update a user's screen name with an inputted new one
 $("#update-user").on('submit', function(event){
    event.preventDefault();
    //get old name and new name
   var updateInput = $('#update-input');
   var inputString = updateInput.val();

   //seperate them by ';'
   const parsedStrings = inputString.split(';');
   var oldSName = parsedStrings[0];
   var newName = parsedStrings[1];

   //pass old name by url
    $.ajax({
        url: '/tweets/' + oldSName,
        method: 'PUT',
        contentType: 'application/json',
        //pass newname by data
        data: JSON.stringify({newName: newName}),
        success: function(response){
          console.log(response);
        }
    });
 });

 /*
  DELETE ---
 */

 //Delete a tweet when given id
 $("#delete-form").on('submit', function() {
  //get ID
 var deleteInput = $('#delete-input');
 var tweetid =  deleteInput.val();
  //pass id through URL
      $.ajax({
          url: '/tweetinfo/' + tweetid,
          method: 'DELETE',
          contentType: 'application/json',
          success: function(response){
         console.log(response);
          }
      });
 });
});
<<<<<<< Updated upstream
                   
=======
      
function test_print(){
  console.log(“test code”)

}
>>>>>>> Stashed changes
  