
$(function() {
  //Get users button
  $('#get-button').on('click', function() {
       //TODO: get all users' IDs & display it
        console.log('this is the get-button');
      
        $.ajax({
          url: '/tweets',
          contentType: 'application/json',
          success: function(response) {
            console.log(response);
          }
        });
   });
});

