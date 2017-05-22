function fetchChuckWords(){
  var req = new XMLHttpRequest()
  req.open('GET', 'https://api.chucknorris.io/jokes/random', false)
  req.send()
  return JSON.parse(req.responseText).value
}

function fetchAndRenderGifs(element, index, array){
  $('.images').append(`<img id="${index}" src="" title="${element}"/>`)
  var url = `http://api.giphy.com/v1/gifs/translate?s=${element}&api_key=dc6zaTOxFJmzC`
  $.ajax({
    url: url,
    success: function(data){renderGifs(data, index, element)}
  })
}

function renderGifs(data, index){
  const gif = data["data"]["images"]["fixed_height"]["url"]
  const $id = $(`#${index}`)
  $id.attr('src', `${gif}`)
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
