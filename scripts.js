
$(function() {
   //Get 
   $('#get-button').on('click', function() {
        //TODO: get all users' IDs & display it
      $.ajax({
        url: '/tweets',
        contentType: 'application/json',
        success: function(response){
          var tbodyEL = $('tbody');

          tbodyEL.html('');

          response.tweetinfo.forEach(function(tweet) {
            tbodyEL.append('\
            <tr>\
              <td class = "id">' + tweet.id + '</td>\
              <td><input type="text" class="name" value="' + tweet.name + '"></td>\
                <td>\
                  <button class="update-button">UPDATE/PUT</button>\
                  <button class="delete-button">DELETE</button>\
              </td>\
              </tr>\
          ');
      });
    }
  });
});

    


    //Get tweets
    $('#get-tweets-button').on('click', function(){
        //TODO: get tweet info and display it
    });

    //Get searched tweets
    $('#get-searched-tweets').on('click', function() {
        //TODO: get a searched tweet(s) & display it
    });


  //CREATE(?)
  $('#create-form').on('submit', function(event){
        event.preventDefault();

        var createInput = $('#create-input');

        //TODO: creat a tweet

      $,ajax({
        //might just be /tweets but not sure?
        url: '/tweetinfo',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({name: createInput.val() }),
        success: function(response){
          console.log(response);
          createInput.val('');
          $('get-button').click();
        }
      });
  });

    //Create searched tweets
  $('#search-form').on('submit', function(event){
    event.preventDefault();
    var userID = $('#search-input');
    
    //TODO: search a tweet and display it.

  });

  //UPDATE/PUT
  $("#update-user").on('submit', function(event){
      event.preventDefault();
    var updateInput = $('#update-input');
    var inputString = updateInput.val();

    const parsedStrings = inputString.split(';');

    var name = parsedStrings[0];
    var newName = parsedStrings[1];
    
    //TODO: update a tweet
/* may or may not be already done above?
    var rowEl = $(this).closest('tr');
    var id = rowEl.find('.id').text();
    var newName = rowEl.find('.name').val();
*/$.ajax({
  url: '/tweets' + id,
  method: 'PUT',
  contentType: 'application/json',
  data: JSON.stringify({ newName: newName}),
        success: function(response) {
          console.log(response);
          $('#get-button').click();
        }
    });
  });



  //DELETE
  $("#delete-form").on('submit', function() {
    var id = $('#delete-input')
    event.preventDefault();

    //TODO: delete a tweet
    $.ajax({
      url: '/tweetinfo' + id,
      method: 'DELETE',
      contentType: 'application/json',
      success: function(response) {
        console.log(response);
        $('#get-button').click();
      }
    });
  });


});


                    
   