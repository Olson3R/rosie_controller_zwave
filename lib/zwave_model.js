var SwitchBinary = require('./classes/switch_binary')
var SwitchMultilevel = require('./classes/switch_multilevel')
var _ = require('underscore')

var _zwave = null

var COMMAND_CLASS_SWITCH_BINARY = '37'
var COMMAND_CLASS_SWITCH_MULTILEVEL = '38'

function Base(id) {
  this.id = id
}

Base.setZwave = function(zwave) {
  _zwave = zwave
}

Base.find = function(id) {
  id = parseInt(id, 10)
  node = _zwave.nodes[id]
  if (node) {
    return Base.create(id, node)
  }
}

Base.nodes = function() {
  return _.map(_zwave.nodes, function(node, index) {
    return Base.create(index, node)
  })
}

Base.lights = function() {
  return _.filter(Base.nodes(), function(node) {
    return node.isLight()
  })
}

Base.create = function(id, node) {
  return _.extend(new Base(id), node)
}

Base.prototype.update = function(payload) {
  var self = this
  var classes = _.result(payload, 'classes') || {}
  _.each(classes, function(value, key) {
    switch(key) {
      case COMMAND_CLASS_SWITCH_BINARY:
        new SwitchBinary(self, _zwave).update(value)
        break
      case COMMAND_CLASS_SWITCH_MULTILEVEL:
        new SwitchMultilevel(self, _zwave).update(value)
        break
    }
  })
}

Base.prototype.isLight = function() {
  return this.isSwitchBinary() || this.isSwitchMultilevel()
}

Base.prototype.isSwitchBinary = function() {
  classes = this.classes
  return classes && !_.isEmpty(classes[COMMAND_CLASS_SWITCH_BINARY])
}

Base.prototype.isSwitchMultilevel = function() {
  classes = this.classes
  return classes && !_.isEmpty(classes[COMMAND_CLASS_SWITCH_MULTILEVEL])
}

Base.prototype.turnOff = function() {
 if (this.isSwitchBinary()) new SwitchBinary(this, _zwave).turnOff()
 if (this.isSwitchMultilevel()) new SwitchMultilevel(this, _zwave).turnOff()
}

Base.COMMAND_CLASS_SWITCH_BINARY = COMMAND_CLASS_SWITCH_BINARY
Base.COMMAND_CLASS_SWITCH_MULTILEVEL = COMMAND_CLASS_SWITCH_MULTILEVEL

module.exports = Base
