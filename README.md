# rosie_controller_zwave
A plugin for the [Rosie Controller](https://github.com/Olson3R/rosie_controller) application that adds the ability to interface with Z-Wave devices. Adds /zwave endpoints.

# Dependencies
1. Z-Wave Controller: Developed with an [Aeon Labs: Z-Stick](http://aeotec.com/z-wave-usb-stick)

# Configuration
1. On the [rosie_controller](https://github.com/Olson3R/rosie_controller) application, run `npm install rosie_controller_zwave --save`
2. Add and configure the plugin in the controllers rejoice configuration file.
```
"rosie_controller_zwave": {
    "config": {
    "logging": false,
    "consoleoutput": true,
    "saveconfig": true,
    "driverattempts": 3,
    "pollinterval": 500,
    "suppressrefresh": true
  },
  "USB_ADDRESS": "/dev/aeon_z_stick"
}
```
