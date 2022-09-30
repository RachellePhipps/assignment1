$(function() {
  //Get users; ID
  $('#get-button').on('click', function() {
      $.ajax({
          url: '/tweets',
          contentType: 'application/json',
          success: function(response){
              var tbodyEl = $(namebody);
              tbodyEl.html('');
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
  
   //DONE: get all tweets
   $('#get-tweets-button').on('click', function(){
       $.ajax({
        url: '/tweetinfo',
        contentType: 'application/json',
        success: function(response){
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

   //Get Recently Searched Button
   $('#get-searched-tweets').on('click', function() {
       //TODO: get a searched tweet(s) & display it
      //dislay a liiiiist dog

      $.ajax({
        url: '/searchinfo',
        method: 'GET',
        contentType: 'application/json',
        success: function(response){
            var tbodyEl = $(searchbody);
            tbodyEl.html('');
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

   //CREATE
   $('#create-form').on('submit', function(event){
    event.preventDefault();

    var createInput = $('#create-input');
    var inputString = createInput.val();

    const parsedStrings = inputString.split(';');

    var newID = parsedStrings[0];
    var newTEXT = parsedStrings[1];

    $.ajax({
        url: '/tweetinfo/' + newID,
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({newtxt : newTEXT}),
        success: function(response){
          console.log(response);
          createInput.val('');
        }
    });    
});

   // question 4 / Search form
 $('#search-form').on('submit', function(event){
   event.preventDefault();
   var searchInp = $('#search-input');
   var userID =  searchInp.val();

    //your given this, must find in big array
    var found = false;

    $.ajax({
      url: '/searchinfo',
      method: 'GET',
      contentType: 'application/json',
      success: function(response) {
        var tbodyEl = $(searchbody);
        tbodyEl.html('');
        response.tweets.forEach(function(tweet) {
          if (!found && tweet.id === Number(userID)){
          tbodyEl.append('\
          <tr>\
            <td class="user">' + tweet.id + '</td>\
            <td class="user">' + tweet.text + '</td>\
            <td class="user">' + tweet.created_at + '</td>\
          </tr>\
          ');
          $.ajax({
            url: '/searchinfo',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(({foundID: tweet.id, foundtext: tweet.text, foundCA: tweet.created_at})),
            success: function(response){
              console.log(response);
              console.log('made it to like 129 or so');
                 }   
            });
          }
        });
        console.log("done.");
      }
    });
  });  





 //UPDATE 5. / Update user FORM
 $("#update-user").on('submit', function(event){
    event.preventDefault();
   var updateInput = $('#update-input');
   var inputString = updateInput.val();

   const parsedStrings = inputString.split(';');
   var oldSName = parsedStrings[0];
   var newName = parsedStrings[1];

    $.ajax({
        url: '/tweets/' + oldSName,
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify({newName: newName}),
        success: function(response){
          console.log(response);
        }
    });
 });


 //DELETE 6 / Delete tweet FORM
 $("#delete-form").on('submit', function() {

 var deleteInput = $('#delete-input');
 var tweetid =  deleteInput.val();

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
                   
  