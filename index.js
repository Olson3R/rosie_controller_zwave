var Zwave = require('./lib/zwave')

var register = function(server, options, next) {
  zwave = new Zwave(server, options)
  server.expose('zwave', zwave)
  server.expose('ZwaveModel', require('./lib/zwave_model'))
  server.on('start', function() {
    zwave.start()
  })
  server.on('stop', function() {
    zwave.stop()
  })

  return next()
}

register.attributes = {
  pkg: require('./package.json')
}

module.exports = register
