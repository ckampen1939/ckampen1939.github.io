$.fn.animateRotate = function(angle, duration, easing, complete) {
  return this.each(function() {
    var $elem = $(this)

    $(this).animate({deg: angle}, {
      duration: duration,
      easing: easing,
      step: function(now) {
        $elem.css({
           transform: 'rotate(' + now + 'deg)'
         })
      },
      complete: complete || $.noop
    })
  })
}

$.loading = function () {

  $('html body #wrapper #container #main .group, '+
    'html body #wrapper #container #main .translation, ' +
    'html body #wrapper #container #main .center, ' +
    'html body #wrapper #container #main .content').remove()
  if (loading == 'dots'){
  $('html body #wrapper #container #main #dots .fill').css(
    'animation', 'move 3s infinite cubic-bezier(.25,.85,.85,.1)'
    )
  $('html body #wrapper #container #main #dots .fill:nth-of-type(2)').css(
    'animation', 'move 3s 150ms infinite cubic-bezier(.25,.85,.85,.1)'
    )
  $('html body #wrapper #container #main #dots .fill:nth-of-type(3)').css(
    'animation', 'move 3s 300ms infinite cubic-bezier(.25,.85,.85,.1)'
    )
  $('html body #wrapper #container #main #dots .fill:nth-of-type(4)').css(
    'animation', 'move 3s 450ms infinite cubic-bezier(.25,.85,.85,.1)'
    )
  $('html body #wrapper #container #main #dots .fill:nth-of-type(5)').css(
    'animation', 'move 3s 600ms infinite cubic-bezier(.25,.85,.85,.1)'
    )
  } else if (loading == 'percent'){
    complete = setInterval(function() {
      $('#progressBar').width($('#progressBar').width() +
        Math.floor(Math.random() * (15 - 10 + 1) + 10))
    }, 450)
  }
}

$.unloading = function() {
  setTimeout(function() {
    if (loading == 'dots'){
      $('html body #wrapper #container #main .fill').css('animation','none')
      progress(true, 0)
    } else if (loading == 'percent') {
      clearInterval(complete)
      progress(true, 100)
    }
  }, 400)
}

String.prototype.space = function() {

  return this.toLowerCase().replace(/%20|\-|\_|\s|\+|\/|\.|\+1/g, ' ')

}

String.prototype.image = function() {

  return 'images/webp/' + this + '.webp'

}

String.prototype.hyphen = function() {

  return this.toLowerCase().replace(/\/|\.|\s/g, '-')

}

$.random = function() {

  for (i = 1; i <= menu.length - 1; i++) {
    if (onlyImages == true){
      if (menu[i].cat == category && menu[i].media == true) array.push(menu.indexOf(menu[i]))
    } else if (onlyImages == false){
      if (menu[i].cat == category) array.push(menu.indexOf(menu[i]))
    }
  }
  var n = array[Math.floor(Math.random() * array.length - 1)]
  readDupe.push(n)
  return n

}

$.next = function() {

  if (filter.length > 1)
    var plus = filter.indexOf(menu.indexOf(menu[parseInt(id)]))
  else var plus = parseInt(id)
  if (filter[plus + +1]) var next = filter[plus + +1]
  else if (id == menu.length - 1) var next = 1 + +1
  else var next = parseInt(id) + +1

  return parseInt(next)

}

$.back = function() {

  if (filter.length > 1)
    var plus = filter.indexOf(menu.indexOf(menu[parseInt(id)]))
  if (filter[plus - +1]) var back = filter[plus - +1]
  else if (id == 0) var back = menu.length - 1
  else var back = parseInt(id) - +1

  return parseInt(back)

}

String.prototype.domain = function() {

  return this.match(/^(?:http:\/\/|www\.|https:\/\/)([^\/]+)/g)

}

String.prototype.define = function() {

  var n = this
  if (contrast == true && !location.href.match('\\+1')) n = n + '+1'
  else if (contrast == true) n = n + '+1'
  return n

}

String.prototype.zulu = function() {

    var opt = {
        weekday: 'long',
        day: '2-digit',
        month: 'short',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    }
    var dmz = []
    var utc = new Date(this)
    dmz.push(this.moment())
    var gmt = utc.toLocaleString('en-US', opt)
    dmz.push(gmt)

    return dmz

}

String.prototype.escape = function() {

    return this.replace(/\&.+\;/g, '')
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;")

}

String.prototype.capitalize = function() {

    return this.replace(/(\b[a-z](?!\s))/g, function(n) {
        return n.toUpperCase()
    })

}

String.prototype.truncate = function(n, useWordBoundary) {

        if (this.length <= n) {
            return this;
        }
        var subString = this.substr(0, n - 1);
        return (useWordBoundary ?
            subString.substr(0, subString.lastIndexOf(' ')) :
            subString) + "..."

}

String.prototype.grep = function(n) {

  var n = this
    if (onlyImages == true){
    	return $.grep(menu, function (elem) {
    	    return elem.cat == n && elem.media == true;
    	}).length
    } else if (onlyImages == false){
      return $.grep(menu, function (elem) {
    	    return elem.cat == n;
    	}).length
    }
}

String.prototype.moment = function() {

    var age = new Date()
    var utc = new Date(this)
    var dis = age.getTime() - utc.getTime()
    if (dis < 0) dis = -dis
    var sec = dis / 1000
    if (sec < 60) return parseInt(sec) + ' second' + (parseInt(sec) >
        1 ? 's' : '')
    var min = sec / 60
    if (min < 60) return parseInt(min) + ' minute' + (parseInt(min) >
        1 ? 's' : '')
    var h = min / 60
    if (h < 24) return parseInt(h) + ' hour' + (parseInt(h) > 1 ?
        's' : '')
    var d = h / 24
    if (d < 30) return parseInt(d) + ' day' + (parseInt(d) > 1 ? 's' :
        '')
    var m = d / 30
    if (m < 12) return parseInt(m) + ' month' + (parseInt(m) > 1 ?
        's' : '')
    var y = m / 121

    return parseInt(y) + ' year' + (parseInt(y) > 1 ? 's' : '')

}

String.prototype.state = function() {

    history.replaceState(null, null, this)

}

String.prototype.blank = function() {

  window.open(this, '_blank', 'noreferrer noopener')

}

String.prototype.exit = function() {

    window.location.assign(this)

}
