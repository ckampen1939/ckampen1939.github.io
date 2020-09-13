var op = 0 //1 invert, 2 opposite
var loading = 'dots' //or 'percent'
var contrast = false //opposite of op
var onlyImages = false //grep, random, populate only return media true
var category = 'Social' //legacy
var cors = 'https://acktic-github-io.herokuapp.com/' // cors-anywhere
var translations =
  ['Social', 'News', 'Media', 'Sports', 'Technology', 'World', 'Youtube'] // reorder option

/* Feel free to edit the above. */

var id
var img
var post
var posts
var images
var tap = 0
var complete
nextAngle = 0
var array = []
var mouseAsset
var filter = []
var object = []
var stop = false
var first = true
var readDupe = []
var reader = false
var enableDrag = false

var tag = "<div class='tag' style='display:none'>" +
          "  <div class='images fa-heart-o'></div>" +
          "  <div class='images fa-comment-o'></div>" +
          "  <div class='images fa-sticky-note-o' title='Copy Post'></div>" +
          "  <div class='images fa-bookmark-o' title='Copy Source'></div>" +
          "</div>"

var notify = function(n) {
  $('html body #wrapper #container #main #notification').show().html(n)
    $('html body #wrapper #container #main #notification').animate({
      bottom: '0px'
      }, 1000)
  setTimeout(function () {
    $('html body #wrapper #container #main #notification').animate({
      bottom: '-200px'
    }, 1000)
  }, 2500)
}

var guide = function(n, re, element, courtesy, title, dst, share, src) {

  $('html body #wrapper #container #guide').empty().css('display','flex').append(
    "<svg class='checkmark' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 52 52'>" +
    "  <circle class='checkmark__circle' cx='26' cy='26' r='25' fill='none' />" +
    "  <path class='checkmark__check' fill='none' d='M16 16 36 36 M36 16 16 36' />" +
    "</svg>" +
    "<div class='blur'></div>" +
    "<div class='sticky'>" +
    "  <div class='fill'></div>" +
    "  <div class='item " + n + "' item='" + n + "' ext='" + re + "'>" +
    "    <div class='image'>" +
    "      <img class='img guide " + element + "' style='display:none' id='" + element + "'>" +
    "    </div>" +
    "  </div>" +
    "  <div class='wrap' style='display:none'>" +
    "    <div class='header' style='display:none'>" + courtesy +
    "      <div class='copy fa-ellipsis-h' title='Copy URL'>" +
    "    </div>" +
    "  <input class='url' value='" + re + "'>" +
    "  <input class='share' value='" + share + "'>" +
    "  <input class='source' value='" + src + "'>" +
    "  </div>" +
    "  <div class='pub' style='display:none'>" + title + "</div>" +
    "  <div class='ago' style='display:none'>" + dst + "</div>" +
        tag +
    "</div>"
  )
  $('html body #wrapper #container #main #top').hide()
}

var content  = function(n, recent, oldest, posts) {

    var count = 0
    $('.img').each(function () {
      if (this.src.length > 0) {
        count = count + 1
      }
    });
    $('html body #wrapper #container #main .status').append(
      "<div class='asset' aria-item='" + menu.indexOf(menu[n]) + "'>" +
      "  <img src='" + menu[n].img.image() + "'" +
      "  class='id " + menu.indexOf(menu[n]) + "'>" +
      "</div>" +
      "<div class='info'>" +
      "  <a ext='" + menu[n].ext + "'>" + menu[n].id.match(/[^\/]+$/g) +
      "  </a>" +
      "  <br>" +
      "  <b>Most recent...</b><div style='float:right'>" + recent +"</div><br>" +
      "  <b>Oldest post...</b><div style='float:right'>" + oldest + "</div><br>" +
      "  <b>Images</b>&ensp;<div class='images'>" + count + "</div><br>" +
      "  <b>Posts</b>&ensp;" + posts +
      "</div>"
    )

}

var base = function(n) {

  $('html body #wrapper #container #main #visit #page #front #first .listing').empty()
  for (var i = menu.length - 1; i >= 1; i--) {
    if (menu[i].des.toLowerCase().match(n) ||
        menu[i].cat.toLowerCase().match(n)) {
      $('html body #wrapper #container #main #visit #page #front #first .listing').prepend(
        "<div class='index' aria-item='" + menu.indexOf(menu[i]) + "'" + " tabIndex='-1'>" +
        "  <div class='background'></div>" +
        "  <div class='detail'>" +
        "    <div class='radial'></div>" +
        "    <img class='type' src='" + menu[i].img.image() + "'>" +
        "    <div class='text'>&emsp;<b>" + menu[i].cat + "</b>" +
        "    <br>&emsp;" + menu[i].id.match(/[^\/]+$/g) + "</div>" +
        "  </div>" +
        "</div>"
      )
      if ($('html body #wrapper #container #main #visit #page #front #first .listing .' + i).length > 1)
        $('html body #wrapper #container #main #visit #page #front #first .listing .' + i + ':last').remove()
    }
  }
  if (!$('html body #wrapper #container #main #visit #page #front #first').is(':visible')) {
    setTimeout(function() {
      $('html body #wrapper #container #main #visit #page #front #first').show()
    }, 50)
  }

}

var list = function(n) {

  $('html body #wrapper #container #main #top #arm #search #match .listing').empty()
  for (var i = menu.length - 1; i >= 1; i--) {
    if (menu[i].des.toLowerCase().match(n) ||
        menu[i].cat.toLowerCase().match(n)) {
      $('html body #wrapper #container #main #top #arm #search #match .listing').prepend(
        "<div class='index' aria-item='" + menu.indexOf(menu[i]) + "'" + " tabIndex='-1'>" +
        "  <div class='background'></div>" +
        "  <div class='detail'>" +
        "    <div class='radial'></div>" +
        "    <img class='type' src='" + menu[i].img.image() + "'>" +
        "    <div class='text'>&emsp;<b>" + menu[i].cat + "</b>" +
        "    <br>&emsp;" + menu[i].id.match(/[^\/]+$/g) + "</div>" +
        "  </div>" +
        "</div>"
      )
      if ($('html body #wrapper #container #main #top #arm #search #match .listing .' + i).length > 1)
        $('html body #wrapper #container #main #top #arm #search #match .listing .' + i + ':last').remove()
    }
  }
  if (!$('html body #wrapper #container #main #top #arm #search #match').is(':visible')) {
    setTimeout(function() {
      $('html body #wrapper #container #main #top #arm #search #match').show()
    }, 50)
  }

}

var feed  = function(n) {

  var dupe = []
  for (var i = 1; i <= n; i++) {
    var e = menu.indexOf(menu[Math.floor(Math.random() * menu.length - 1)])
    if (menu[e] && e != 0 && $.inArray(e, dupe) == -1){
      dupe.push(e)
        $('html body #wrapper #container #main .center .quick .feed').append(
          "<div class='asset' aria-item='" + menu.indexOf(menu[e]) + "'>" +
          "  <div class='radial'></div>" +
          "  <img src='" + menu[e].img.image() + "' class='id'> " +
          "  <a style='left:0;width:100%' ext='" + menu[e].ext + "'" +
               "title='" + menu[e].id + "'>" +
               String(menu[e].id.match(/[^\/]+$/g)).substring(0,9) + '...' +
          "  </a>" +
          "</div>"
       )
     }
  }
  visual()
}

var quick  = function(n) {

  var dupe = []
  if (n == 7)
  for (var i = 0; i <= translations.length - 1; i++){
    $('html body #wrapper #container #main #visit #page #front .quick .feed').append(
      "<div class='assetTranslation' aria-item='" + translations[i] + "'>" +
      "  <img src='images/" + translations[i] + ".webp' class='idTranslation'> " +
      "  <a title='" + translations[i] + "'>" +
           translations[i].substring(0,9) + '...' +
      "  </a>" +
      "</div>"
   )
  }
  for (var i = 1; i <= n; i++) {
    var e = menu.indexOf(menu[Math.floor(Math.random() * menu.length - 1)])
    if (menu[e] && e != 0 && $.inArray(e, dupe) == -1){
      dupe.push(e)
        $('html body #wrapper #container #main #visit #page #front .quick .feed').append(
          "<div class='asset' aria-item='" + menu.indexOf(menu[e]) + "'>" +
          "  <div class='radial'></div>" +
          "  <img src='" + menu[e].img.image() + "' " +
          "    class='id " + menu.indexOf(menu[e]) + "'" +
          "    search='" + menu[e].cat.toLowerCase() + "'> " +
          "  <a title='" + menu[e].id + "'>" +
               String(menu[e].id.match(/[^\/]+$/g)).substring(0,9) + '...' +
          "  </a>" +
          "</div>"
       )
     }
  }
  visual()
}

var progress = function(complete, n) {

  $(document).ready(function() {
    $('#progressBar').addClass('response').width(n + '%')
    if (complete == true) {
      $('#progressBar').on(
        'transitionend webkitTransitionEnd oTransitionEnd',
        function(e) {
          $(this).removeClass('response').width(0)
          $('html body #wrapper #container #main .content').css('visibility', 'visible')
          $('html body #wrapper #container #main .result').show()
          $('html body #wrapper #container #main .center').show()
          $('html body #wrapper #container #main .air').show()
          $('html body #wrapper #container #main').scrollTop($('.air').outerHeight())
            if (reader == true && stop == true && first == true){
                if ($('html body #wrapper #container #main').innerHeight() >=
                    $('html body #wrapper #container #main .channel').innerHeight()){
                      if ($.active <= 0){
                        reader = true
                        first = false
                        stop = true
                        xml(null, null, $.random())
                      } else {
                        first = false
                        stop = true
                        xml(null, null, $.random())
                      }
                } else first = false
            }
        })
      visual()
    }
  })

}

var suggest = function(n) {

  var duplicate = []
  for (var i = 0; i <= 7; i++) {
    var e = menu.indexOf(menu[Math.floor(Math.random() * menu.length - 1)])
    duplicate.push(e)
    if (menu[e] && e != 0 && $.inArray(duplicate, e) == -1){
      $('html body #wrapper #container #main .suggestions').append(
        "<div class='combine'>" +
        "  <div class='radial'></div>" +
        "  <img src='" + menu[e].img.image() + "' " +
        "    class='id'>" +
        "  <div class='suggest' aria-item='" + menu.indexOf(menu[e]) + "'" +
        "    title='" + menu[e].id + "'><b>" +
             String(menu[e].id.match(/[^\/]+$/g)).substring(0,18) + "</b>..." +
        "    <div style='float:right'><a aria-item='" + menu[e].cat + "'>" +
               menu[e].cat + "</a>" +
        "    </div>" +
        "  </div>" +
        "</div>"
      )
    }
    if (i == 9) return false
  }

}

var populate = function(n) {

    $(document).ready(function() {
      if ($('html body #wrapper #container #main .group').length < 1)
      $('html body #wrapper #container #main').append(
        "<div class='group'>" +
        "  <div class='result' style='display:none'>" +
        "  </div>" +
        "</div>"
      )
    for (var i = 1; i <= menu.length - 1; i++) {
      if (onlyImages == true){
        if (id != menu.indexOf(menu[i]) && menu[i].media == true && n == menu[i].cat)
          $('html body #wrapper #container #main .result').append(
            "<div class='populate'" +
            "  aria-item='" + menu.indexOf(menu[i]) + "'>" +
            "  <div class='display'>" +
            "    <img class='id' src='" + menu[i].img.image() + "'> " +
            "  </div>" +
            "    <a class='title' ext='" + menu[i].ext +  "'>" +
                   menu[i].id.match(/[^\/]+$/g) +
            "    </a>" +
            "</div>"
          )
      } else if (onlyImages == false){
          if (id != menu.indexOf(menu[i]) && n == menu[i].cat)
            $('html body #wrapper #container #main .result').append(
              "<div class='populate'" +
              "  aria-item='" + menu.indexOf(menu[i]) + "'>" +
              "  <div class='display'>" +
              "    <img class='id' src='" + menu[i].img.image() + "'> " +
              "  </div>" +
              "    <a class='title' ext='" + menu[i].ext +  "'>" +
                     menu[i].id.match(/[^\/]+$/g) +
              "    </a>" +
              "</div>"
            )
        }
    }
    if (onlyImages == false) air(category)
    else if (onlyImages == true) $.unloading()
  })
}

var air = function(n) {

  $(document).ready(function () {
  $('html body #wrapper #container #main .result').before("<div class='air' style='display:none'></div>")
  for (var i = 1; i < menu.length - 1; i++) {
    if (category == menu[i].cat)
      $('html body #wrapper #container #main .air').append(
        "<div class='populate'" +
        "  aria-item='" + menu.indexOf(menu[i]) + "'>" +
        "  <div class='display'>" +
        "  <img class='id' src='" + menu[i].img.image() + "'> " +
        "  </div>" +
        "    <a class='title' ext='" + menu[i].ext +  "'>" +
               menu[i].id.match(/[^\/]+$/g) +
        "    </a>" +
        "</div>"
      )
  }
  $.unloading()
  visual()
})
}

var response = function(passthrough, uri, n, bloat) {
  id = false
  filter = []
  exact = false
    if ($.inArray(n.toString().capitalize(), translations) > -1){
      category = n.capitalize()
      $(document).ready(function() {
        $('html body #wrapper #container #main #visit').hide()
        populate(n.capitalize())
        $.unloading()
      })
      return false
    }
  $('html body #wrapper #container #main #visit').show()
  if (n) var n = n.toString().space()
  if (uri) uri = uri.toString().space()
  else uri = n
    for (var i = 1; i <= menu.length - 1; i++) {
      if (menu[i].hash == n) {
        filter.push(menu.indexOf(menu[i]))
        if (passthrough == false) write(menu.indexOf(menu[i]))
        exact = i
        id = i
        break
      } else if (
          menu[i].id.space() == n.toLowerCase() ||
          menu[i].id.space() == uri.toLowerCase()
        ) {
            filter.push(menu.indexOf(menu[i]))
            var exact = i
            id = i
            break
      } else if (
          menu[i].id.space().match(n.toLowerCase()) ||
          menu[i].id.space().match(uri.toLowerCase())
        ) {
            filter.push(menu.indexOf(menu[i]))
      } else if (
          menu[i].des.match(n.toLowerCase()) ||
          menu[i].des.match(uri.toLowerCase())
        ) {
            filter.push(menu.indexOf(menu[i]))
      } else if (
          menu[i].cat.toLowerCase().match(n) ||
          menu[i].cat.toLowerCase().match(uri)
        ) {
            filter.push(menu.indexOf(menu[i]))
      }
    }
    if (!id) id = filter[0]
    if (passthrough == false) {
      $(document).ready(function() {
        $('html body #wrapper #container #main #visit').hide()
        $('html body #wrapper #container #main').append(
          "<div class='group'>" +
          "  <div class='result' style='display:none'>" +
          "  </div>" +
          "</div>"
        )
      for (i = filter.length - 1; i >= 0; i--){
        write(filter[i])
      }
      $.unloading()
    })
    } else if (passthrough == true) {
      if ($.isNumeric(exact)) {
        xml(null, null, exact)
      } else if ($.isNumeric(id) && filter.length == 1) {
        xml(null, null, id)
      }
    }
    if (filter.length == 0) {
      xml('search', n, 0, null)
    }
    if (bloat == true) {
      populate(menu[id].cat)
    }
    $.unloading()
}

var write = function(n) {

  $(document).ready(function() {
    $('html body #wrapper #container #main .group .result').prepend(
      "<div class='filter' " +
      "  aria-item='" + menu.indexOf(menu[n]) + "'>" +
      "  <div class='display'>" +
      "  <img class='id' src='" + menu[n].img.image() + "'> " +
      "  </div>" +
      "    <a class='title' ext='" + menu[n].ext +  "'>" +
             menu[n].id.match(/[^\/]+$/g) +
      "    </a>" +
      "</div>"
    )
  })
}

var image = function(empty, n, item, src) {

  var maximum = 799
  var minimum = 299
  var small = 120
  var k = 5420

  if (src.match(/https?\:\/\//g)) {
  $('.' + n).find(' .' + item).on('error', function() {
    $(this).parents('.classic').find('.tag, .fill, .header').remove()
    $(this).parents('.item').find('.pub, .ago, .addComment').css('display','block')
           .parents('.item').find('.url, .share, .source, .header, .image, .img, .fill').remove()

  }).on('load', function() {
    if ($('html body #wrapper #container #main #top #arm #search #home').css('display') == 'none'){
      $('.sticky').show()
      if ($(this).get(0).naturalWidth > minimum) $(this).width('100%')
      else if ($(this).get(0).naturalWidth < maximum) {
          $(this).width(99).addClass('expand').css('margin','10px')
          .parents('.item')
          .find('.classic').css({
            'display': 'flex',
            'align-items': 'center'
           }).find('.header, .tag, .addComment').remove()
       }
      if ($(this).hasClass('guide')) {
      $('html body #wrapper #container #main').addClass('guide')
       if ($(this).get(0).naturalWidth >= $(this).get(0).naturalHeight)
         $(this).css('max-width', '85vh').parents('.sticky').width('90vh')
       else if ($(this).get(0).naturalHeight >= $(this).get(0).naturalWidth)
         $(this).width('100%').css('cssText', 'max-width: 60vh')
         $(this).parents('#guide').find('.image, .img').css('display', 'block')
         $(this).parents('#guide').find('.url, .share, .source, .header, .wrap, .fill').remove()
      }
    } else {
     if ($(this).hasClass('guide')) {
      $('.sticky, .checkmark').show()
      $('html body #wrapper #container #main').addClass('guide')
       if ($(this).get(0).naturalHeight >= $(this).get(0).naturalWidth)
         $(this).css('max-height', '90vh')
       else if ($(this).get(0).naturalWidth >= $(this).get(0).naturalHeight)
         $(this).css('max-width', '100%').parents('.sticky').width('90%')
     } else if ($(this).get(0).naturalWidth < small) {
         $(this).width('100%').css('margin','10px')
           .parents('.item')
           .find('.classic').css({
             'display': 'flex',
             'align-items': 'center'
           }).find('.header, .tag, .addComment').remove()
      } else if ($(this).get(0).naturalHeight < minimum) {
        $(this).width(140).css('margin','10px')
          .parents('.item')
          .find('.classic').css({
            'display': 'flex',
            'align-items': 'center'
          }).find('.header, .tag, .addComment').remove()
     } else if ($(this).get(0).naturalHeight >= $(this).get(0).naturalWidth * 2)
         $(this).addClass('default').width('40vh')
       else if ($(this).get(0).naturalHeight > k) {
         $(this).parents('.item').find('.url, .share, .source, .header, .image, .img, .fill').remove()
      } else if ($(this).get(0).naturalWidth > minimum) $(this).addClass('default').width('100%')
    }
    $('.' + n).find(' .' + item).parents('.item, #guide')
      .find('.image, .img, .pub, .tag, .ago, .addComment').css('display', 'block')
    $('.' + n).find(' .' + item).parents('.item, #guide')
      .find('.header, .wrap').css('display', 'inline-block')
    $('.' + n).find(' .' + item).parents('.item, #guide').find('.fill').remove()
    visual()
  }).attr('src', src)
    .parents('.' + n).find('.fill').css('visibility','visible')
    .html("<div class='loader double-circle'></div>")
  }
  else if (empty == true || onlyImages == true){
    $('.' + n).find(' .' + item).parents('.item').remove()
  } else {
    $('.' + n).find(' .' + item).parents('.item').css({
          'padding-bottom': '30px',
          'padding-top': '30px'
        })
        .find('.pub, .ago, .addComment').css('display','block')
        .parents('.item').find('.url, .share, .source, .header, .image, .img, .fill').remove()
    }

}

var xml = function(e, s, n) {

  id = n
  obj = []
  var local
  var pub = []
  var src = ''
  category = menu[n].cat
  if (e == 'search') {
    uri = cors + menu[n].uri + s + '&format=RSS'
  } else uri = cors + menu[n].uri
  var doc = menu[n].id.space().capitalize()
  document.title = doc
  $('html body #wrapper #container #main #visit').hide()
  if (reader == true && first == true){
    $('html body #wrapper #container #main .center, ' +
      'html body #wrapper #container #main .content, ' +
      'html body #wrapper #container #main .group').remove()
  }
  $.get({
    url: uri,
    method: 'GET',
    dataType: 'xml',
    contentType: 'text/html; charset=utf-8',
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      Accept: 'text/html; charset=utf-8',
      'X-Requested-With': '*'
    }
  }).fail(function() {
    $('html body #wrapper #container #main').append(
      "<div class='center' style='display:none'>" +
      "  <div class='quick'>" +
      "    <div class='feed'></div>" +
      "    <div class='left fa-angle-left' style='display:none'></div>" +
      "    <div class='right fa-angle-right'></div>" +
      "  </div>" +
      "  <div class='channel'></div>" +
      "</div>"
    )
    $('html body #wrapper #container #main .channel').html("This site could not be reached.")
    $.unloading()
    feed(12)
    visual()
  }).done(function(xhr) {
    if ($(xhr).find('entry').length > 0) var channel = "entry"
    else var channel = 'item'
    var quit = $(xhr).find(channel).length - 2
    if (reader == true) {
      if (menu[n].id.match(/Imgur/g)) quit = 25
      else quit = 15
    } else if (menu[n].id.match(/Imgur/g)) quit = 50
    $(xhr).find(channel).each(function(i) {
      if (channel == 'entry') {
        var re = $(this).find('link').attr('href')
        var dst = $(this).find('updated').text().zulu();
        var since = new Date($(this).find('updated').text()).getTime()
        var gen = $(this).find('updated').text().toLocaleString()
        gen = parseInt(
          gen.match(/([0-9]+\:[0-9]+\:[0-9]+)/g).toString()
            .replace(/\:/g, '')
          ).toString(36)
      } else if (channel = 'item') {
        var re = $(this).find('link').text()
        if ($(this).find('pubDate').text().length > 0) {
          var dst = $(this).find('pubDate').text().zulu();
          var since = new Date($(this).find('pubDate').text())
          var gen = new Date($(this).find('pubDate').text()).toLocaleString()
          gen = parseInt(
            gen.match(/([0-9]+\:[0-9]+\:[0-9]+)/g).toString()
              .replace(/\:/g, '')
            ).toString(36)
        } else if ($(this).find('dc\\:date, date').text()) {
          var dst = $(this).find('dc\\:date, date').text().zulu();
          var gen = new Date($(this).find('dc\\:date, date').text()).getTime()
        } else if (menu[n].id.match(/Imgur/g)) {
          var ts = parseInt($(this).find('datetime').text());
          var ts_ms = ts * 1000
          var date = new Date(ts_ms)
          var year = date.getFullYear()
          var mon = ("0" + (date.getMonth() + 1)).slice(-2)
          var min = ("0" + date.getMinutes()).slice(-2)
          var sec = ("0" + date.getSeconds()).slice(-2)
          var hour = ("0" + date.getHours()).slice(-2)
          var date = ("0" + date.getDate()).slice(-2)
          var def = year + "-" +
                    mon + "-" +
                    date + " " +
                    hour + ":" +
                    min + ":" +
                    sec
          var dst = def.zulu()
          var since = new Date(parseInt($(this).find('datetime').text()))
          var gen = parseInt($(this).find('datetime').text()).toString(36)
        } else {
          var dst = []
          dst.push('')
        }
      }
      if ($('#search input[type=text]').val() != 'Search')
        var search = $('#search input[type=text]').val()
      else var search = menu[n].cat.toLowerCase()
      var share = menu[n].hash
      if (gen) var ts = (gen).toString(36)
      if (ts) var share = window.location.origin + '/?' + share + ts
      if ($(this).find('content').text()
      .match(/https:\/\/i\.redd\.it\/.+?(gif|png|jpg)/g)) {
        src = String($(this).find('content').text()
          .match(/https:\/\/i\.redd\.it\/.+?(gif|png|jpg)/g))
      } else if ($(this).find('content').text()
      .match(/https:\/\/.\.thumbs\.redditmedia\.com\/.+?(gif|png|jpg)/g)) {
          src = String($(this).find('content').text()
            .match(/https:\/\/.\.thumbs\.redditmedia\.com\/.+?(gif|png|jpg)/g)
          )
      } else if ($(this).find('content').text()
      .match(/src=['"]https:\/\/.+?(gif|png|jpg)['"]/)) {
        src = String($(this).find('content').text()
          .match(/src=['"](.*?)['"]/)[1])
      } else if ($(this).find('link').attr('hre')) {
        if ($(this).find('link').attr('hre').match(/youtube\.com/))
          src = 'https://www.youtube.com/embed/' +
            String($(this).find('link').attr('hre').split('=')[1])
        else src = String($(this).find('link').attr('hre'))
      } else if ($(this).find('content').text()
      .match(/src=['"]https:\/\/.+?(gif|png|jpg)['"]/)) {
        src = String($(this).find('content').text()
          .match(/src=['"](.+)['"]/)[1])
      } else if ($(this).find('link').attr('hre')) {
        src = String($(this).find('link').attr('hre'))
      } else if ($(this).find('media\\:thumbnail, thumbnail').attr('url')) {
        src = String($(this).find('media\\:thumbnail, thumbnail').attr('url'))
      } else if ($(this).find('link').text()
        .match(/https:\/\/.+?(gif|png|jpg)/)) {
          src = String($(this).find('link').text()
            .match(/https:\/\/.+?(gif|png|jpg)/)[0])
      } else if ($(this).find('image').find('link, url').text()
      .match(/https:\/\/.+?(gif|png|jpg)/)) {
        src = String($(this).find('image').find('link, url').text()
          .match(/https:\/\/.+?(gif|png|jpg)/)[0])
      } else if ($(this).find('enclosure').attr('url')) {
        src = String($(this).find('enclosure').attr('url'))
      } else if ($(this).find('media\\:content, content').attr('url')) {
        src = String($(this).find('media\\:content, content').attr('url'))
      } else if ($(this).find('content\\:encoded').text()
      .match(/img.+src=['"](.*?)['"]/)) {
        src = String($(this).find('content\\:encoded').text()
          .match(/img.+src=['"](.*?)['"]/)[1])
      } else if ($(this).find('description').text().toLowerCase()
      .match(/src=['"](.*?)['"]/)) {
        src = String($(this).find('description').text().toLowerCase()
          .match(/src=['"](.*?)['"]/)[1])
      } else if ($(this).find('image').text()) {
        src = String($(this).find('image').text())
      } else if (src.match(/assets|comments|default|feeds|fsdn|undefined|[^https?:\/\/]/g))
        src = ''
      if (src.match(/ytimg/g)) var yt = 'yt'
      else var yt = ''
      if (src == '') courtesy = ''
      else courtesy =
        "<div class='courtesy' style='float:left'>" +
        "  <img class='id' src='" + menu[n].img.image() + "'>" +
        "  <a ext='" + menu[n].ext + "'>" +
        "    <b>" + menu[n].id.match(/([^\/]+)$/g) + "</b>" +
        "  </a>" +
        "</div>"
      if ($(this).find('title:first').text().length > 125)
        var more = "<div class='more'>more</div>"
      else var more = ""
        if ($(this).find('media\\:statistics, statistics').attr('views'))
            var views =
            "<div class='ago views'>" +
            "  VIEWS " + $(this).find('media\\:statistics, statistics')
              .attr('views').toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
            "</div>"
        else var views = ''
        if (e == 'search') {
          var cat =
            "<div class='external'>" +
              re.domain() +
            "</div>"
        } else var cat = ''
        html =
          "<div class='item " + n + " " + yt + "' item='" + i + "' ext='" + re.trim() + "'>" +
          "  <div class='classic'>" +
          "    <div class='header'>" +
                 courtesy +
                 "<div class='copy fa-ellipsis-h' title='Copy URL'></div>" +
          "    </div>" +
          "    <div class='fill'></div>" +
          "    <div class='image' style='display:none'>" +
          "      <img id='" + i + "' class='" + i + " img' src='" + src + "'>" +
          "    </div>" +
          "    <div class='wrap'>" + tag +
          "      <div class='pub' style='display:none' text='" +
                   $(this).find('title:first').text().escape() + "'>" +
                   $(this).find('title:first').text().truncate(125, true)
                     .escape() +
                   more +
          "      </div>" + views +
          "      <div class='ago zulu' style='display:none'>" + dst[0] + "</div>" +
          "    </div>" +
          "    <input class='url' value='" + re.trim() + "'>" +
          "    <input class='share' value='" + share + "'>" +
          "    <input class='source' value='" + src + "'>" + cat +
/*
          "    <form class='addComment' action'#'>" +
          "      <input class='comment' " +
          "        maxlength='88' placeholder='Add a Comment'" +
          "         onclick='event.stopPropagation()'>" +
          "      <div class='post'><b>Post</b></div>" +
          "    </form>" +
*/
          "  </div>" +
          "</div>"
      pub.push({
        title: $(this).find('title:first').text().escape(),
        courtesy: courtesy,
        re: re.trim(),
        since: since,
        share: share,
        dst: dst[0],
        feed: n,
        more: more,
        element: i,
        post: html,
        src: src,
        gen: gen
      })
      pub.sort(function(a, b) {
        return b.since - a.since
      })
      $.each(pub, function(i) {
        if (parseInt(pub[i].gen, 36) == post) local = i
      })
    })
    if (reader == true && first == true) {
      $('html body #wrapper #container #main').append(
        "<div class='center' style='display:none'>" +
        "  <div class='quick'>" +
        "    <div class='left' style='display:none'>" +
        "      <div class='fa-angle-left'></div></div>" +
        "    <div class='right'>" +
        "      <div class='fa-angle-right'></div></div>" +
        "    <div class='feed'></div>" +
        "  </div>" +
        "  <div class='channel'></div>" +
        "</div>" +
        "<div class='content' style='visibility:hidden'>" +
        "  <div class='status'></div>" +
        "  <div class='suggestions'>" +
        "    <b>suggested</b>&ensp;...<br>" +
        "  </div>" +
        "</div>"
      )
    } else if (reader == false && first == true) {
      $('html body #wrapper #container #main').append(
        "<div class='center' style='display:none'>" +
        "  <div class='quick'>" +
        "    <div class='left' style='display:none'>" +
        "      <div class='fa-angle-left'></div></div>" +
        "    <div class='right'>" +
        "      <div class='fa-angle-right'></div></div>" +
        "    <div class='feed'></div>" +
        "  </div>" +
        "  <div class='channel'></div>" +
        "</div>" +
        "<div class='content' style='visibility:hidden'>" +
        "  <div class='status'></div>" +
        "  <div class='suggestions'>" +
        "    <b>suggested</b>&ensp;...<br>" +
        "  </div>" +
        "</div>"
      )
    }
    if ($.isNumeric(local)) {
      guide(
        i,
        pub[local].re,
        pub[local].element,
        pub[local].courtesy,
        pub[local].title,
        pub[local].dst,
        pub[local].share,
        pub[local].src
      )
      image(true, n, pub[local].element, pub[local].src)
    } else $('#guide').hide()
      $.each(pub, function(i, k) {
        if (i == quit) return false
        if ($.isNumeric(local) && pub[local].element != pub[i].element)
          $('html body #wrapper #container #main .center .channel').append(pub[i].post)
        else if (!$.isNumeric(local))
          $('html body #wrapper #container #main .center .channel').append(pub[i].post)
        if (menu[n].id.match(/Imgur/g)) image(true, pub[i].feed, pub[i].element, pub[i].src)
        else image(false, pub[i].feed, pub[i].element, pub[i].src)
      })
    posts = $('html body #wrapper #container #main .center .channel .item').length
    var recent = $('.' + n + '.item .zulu:first').text()
    var oldest = $('.item .ago:last').text()
    if (reader == false) {
      if (e != 'search') $('html body #wrapper #container #main .center').append(
        "<div id='bottom'>" +
        "  <div class='back btn' aria-item=" + menu.indexOf(menu[$.back()]) + ">" +
        "      <span class='front'></span>" +
        "      <span class='flip-front'>Previous</span>" +
        "      <span class='flip-back'>" + String(menu[$.back()].id.match(/[^\/]+$/g)).substring(0,9) + "...</span>" +
        "  </div>" +
        "  <div class='bottom'>acktic</div>" +
        "  <div class='next btn' aria-item=" + menu.indexOf(menu[$.next()]) + ">" +
        "      <span class='front'></span>" +
        "      <span class='flip-front'>Next</span>" +
        "      <span class='flip-back'>" + String(menu[$.next()].id.match(/[^\/]+$/g)).substring(0,9) + "...</span>" +
        "  </div>" +
        "</div>"
      )
    }
    if (reader == true && first == true){
      if ($.active <= 1){
        first = true
        stop = true
      }
    } else if (reader == false && first == true) {
      if ($.active <= 1){
        first = true
        stop = true
      }
    } else {
      $('html body #wrapper #container #main .status, ' +
        'html body #wrapper #container #main .suggestions').empty()
      if ($.active <= 1){
        first = true
        stop = true
      }
    }
    $('html body #wrapper #container #main').attr('tabindex', -1).focus()
    content(n, recent, oldest, posts)
    feed(40)
    suggest(id)
    $.unloading()
  })

}
