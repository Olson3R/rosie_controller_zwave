var ZwaveModel = require('./zwave_model')

var routes = function(server) {

  server.route({
    method: 'GET',
    path: '/zwave',
    config: {
      handler: function(req, res) {
        res(ZwaveModel.lights())
      }
    }
  })

  server.route({
    method: 'PUT',
    path: '/zwave/{id}',
    config: {
      handler: function(req, res) {
        node = ZwaveModel.find(req.params.id)
        node.update(req.payload)
        res(node)
      }
    }
  })
}

module.exports = routes
