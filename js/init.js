if (location.href.split('?')[1] && !location.search.split('?q=')[1]) {

  var uri = location.href.split('?')[1]
  if (uri.match('\\+1')) {
    uri = uri.replace(/\?\+1|\+1/, '')
    if (!uri.match(/^[a-zA-Z0-9]+$/i)) {
      contrast = contrast != true
      op = op != true
      i = -1
      $(document)
        .ready(function() {
            visual()
      })
    } else {
      contrast = contrast != true
      op = op != true
      visual()
    }

  }

    if (uri.match(/^[a-zA-Z0-9]+$/i)){

      var id = uri.slice(0, 2)
      var i = menu.findIndex((item) => item.hash === id)
      post = parseInt(uri.slice(2), 36)

    }

      if (i === -1)

        $(document)
          .ready(function() {
            $('html body #wrapper #container #main #front').css('visibility','visible')
            $('html body #wrapper #container #main .fill').css('animation','none')
        })

      else {

        $(document)
          .ready(function() {
            $.loading()
            $('html body #wrapper #container #main #visit, ' +
              'html body #wrapper #container #toggle').hide()
            $('html body #wrapper #container #main #top').hide()
            response(true,
                     false,
                     menu[i].id.space(),
                     false)

        })

      }

}

if (location.href.match('\\+1') && !i) {

  contrast = contrast != true
  op = op != true

}

if (location.search.split('?q=')[1]) {

  var uri = location.search.split('?q=')[1]
  uri = uri.replace(/\?\+1|\+1/, '')
  uri = (uri.match(/[^&]+/g))
  if (location.hash.substr(1).match(/\+1/g))

    post = location.hash.substr(1).replace(/\+1/g, '')

  else post = location.hash.substr(1)

  $(document)
    .ready(function() {

      $.loading()
      setTimeout(function() {
        $('html body #wrapper #container #main #top').show()
        if (!uri[1] && location.href.match('\\&')) response(true, false, uri[0], false)
        else if (!uri[1]) response(false, false, uri[0], true)
        else if (uri[1]) response(true, uri[0], uri[1], false)
      }, 250)
    })

} else if (!location.search.split('?')[1]) {

        $(document)
          .ready(function() {

            $('html body #wrapper #container #main #front').css('visibility','visible')
            $('html body #wrapper #container #main .fill').css('animation','none')

        })

}
