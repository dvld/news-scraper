
// 
$.getJSON('/articles', (data) => {
  for (let i = 0; i < data.length; i++) {
    $('#articles').append('<p data-id=\'' + data[i]._id + '\'>' + data[i].headline + '<br />' + data[i].image + '<br />' + data[i].summary + '<br />' + data[i].url + '</p>');
  }
});

$(document).on('click', 'p', () => {

  let thisId = $(this).attr('data-id');

  $.ajax({
    method: 'GET',
    url: '/articles/' + thisId
  })
    .then((data) => {
      console.log(data);

      $('#articles').append('<h2>' + data.headline + '</h2>');

      $('#articles').append('');

      $('#articles').append();

      $('#articles').append();

    })
})
