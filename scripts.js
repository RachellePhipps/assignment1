//<td class="id">' + tweet.id + '</td>\
/**
 *   <td><input type="text" class="user" value"' + tweet.id + '"></td>\
                <td><input type="text" class="user" value"' + tweet.screen_name + '"></td>\
                <td><input type="text" class="user" value"' + tweet.name + '"></td>
 */
$(function() {
  

  //DONE: get users' ids
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
                <td class="id">' + tweet.id + '</td>\
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
              <td class="id">' + tweet.id + '</td>\
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

       
   });


 //Create Tweet FORM
 $('#create-form').on('submit', function(event){
       event.preventDefault(); //prevent hard refresh

       var updateInput = $('#update-input');
       var inputString = updateInput.val();
    
       const parsedStrings = inputString.split(';');
    
       var id = parsedStrings[0];
       var newName = parsedStrings[1];

       $.ajax({
          url: '/tweetinfo', //CHANGE THIS
          method: 'POST',
          contentType: 'application/json',
         // data: {id: createInput.id, name: createInput.name},
          success: function(response){
              console.log(response);

              //empty it
              createInput.val('');

          }


       });

       //TODO: creat a tweet
 });

   // question 4 / Search form
 $('#search-form').on('submit', function(event){
   event.preventDefault();
   var userID = $('#search-input');
   
   //TODO: search a tweet and display it.

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
   var tweetid = $('#delete-input');
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
                   
  