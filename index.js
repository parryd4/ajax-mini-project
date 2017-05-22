function fetchChuckWords(){
  var req = new XMLHttpRequest()
  req.open('GET', 'https://api.chucknorris.io/jokes/random', false)
  req.send()
  return JSON.parse(req.responseText).value
}

function fetchAndRenderGifs(term){
  var url = `http://api.giphy.com/v1/gifs/translate?s=${term}&api_key=dc6zaTOxFJmzC`
  $.ajax({
    url: url,
    success: renderGifs
  })
}

function renderGifs(data){
  const gif = data["data"]["images"]["fixed_height"]["url"]
  $('.images').append(`<img src="${gif}" />`)
}

$(document).ready(function(){
  let $words = $('#words') //.split(' ')

  $('#searchAndGif').on('submit', function(e){
    e.preventDefault()
    $('.images').html( "" )

    let searchTerms
    if ($words.val().length === 0) {
      searchTerms = fetchChuckWords().split(' ')
    } else {
      searchTerms = $words.val().split(' ')
    }

    $words.val('') // clear after submit

    searchTerms.forEach(fetchAndRenderGifs)
  })
})
