
// 
// grab articles as json and display information on the page
$.getJSON('/articles', function (data) {
  for (let i = 0; i < data.length; i++) {
    $('#articles').append('<p data-id\'' + data[i]._id + '\'>' + data[i].image + '<br />' + data[i].headline + '<br />' + data[i].url + '<br />' + data[i].summary + '</p>');
  }
});

$(document).on('click', 'p', function() {
  $('#comments').empty();
  let thisId = $(this).attr('data-id');

  
})