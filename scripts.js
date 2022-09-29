
$(function() {
  //Get user button 2.?
  //SEMI done still needs help
  $('#get-button').on('click', function() {
      $.ajax({
          url: '/tweets',
          contentType: 'application/json',
          success: function(response){
              var tbodyEl = $('tbody');
              tbodyEl.html('');
           
            response.tweets.forEach(function(tweet) {
              tbodyEl.append('\
              <tr>\
                <td class="id">' + tweet.id + '</td>\
                <td><input type="text" class="user" value"' + tweet.screen_name + '"></td>\
                <td><input type="text" class="user" value"' + tweet.name + '"></td>\
              </tr>\
              ');
            });
          }
      });
  });



   //Get tweets 1.) I think?
   $('#get-tweets-button').on('click', function(){
       //TODO: get tweet info and display it
   });

   //Get searched tweets / created_at
   $('#get-searched-tweets').on('click', function() {
       //TODO: get a searched tweet(s) & display it
   });


 //CREATE 4.
 $('#create-form').on('submit', function(event){
       event.preventDefault();

       var createInput = $('#create-input');

       //TODO: creat a tweet
 });

   //maybe 1
 $('#search-form').on('submit', function(event){
   event.preventDefault();
   var userID = $('#search-input');
   
   //TODO: search a tweet and display it.

 });

 //UPDATE 5.
 $("#update-user").on('submit', function(event){
     event.preventDefault();
   var updateInput = $('#update-input');
   var inputString = updateInput.val();

   const parsedStrings = inputString.split(';');

   var name = parsedStrings[0];
   var newName = parsedStrings[1];
   
   //TODO: update a tweet

 });


 //DELETE 6.
 $("#delete-form").on('submit', function() {
   var id = $('#delete-input')
   event.preventDefault();

   //TODO: delete a tweet

 });


});
                   
  