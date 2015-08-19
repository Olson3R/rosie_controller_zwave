var _ = require('underscore')

function SwitchBinary(node, zwave) {
  this.node = node
  this.zwave = zwave
}

SwitchBinary.prototype.update = function(attrs) {
  var self = this
  _.each(attrs, function(value, key) {
    switch(key) {
      case '0': // Switch
        self.setSwitch(value)
        break
    }
  })
}

SwitchBinary.prototype.setSwitch = function(value) {
  if (_.result(value, 'value')) {
    this.zwave.switchOn(this.node.id)
    this.node.classes['37']['0'].value = true
  } else {
    this.zwave.switchOff(this.node.id)
    this.node.classes['37']['0'].value = false
  }
}

SwitchBinary.prototype.turnOff = function() {
  this.setSwitch({value: false})
}

module.exports = SwitchBinary
