'use strict'

//const modbus = require('../..')
const Modbus = require('jsmodbus')
const net = require('net')
const socket = new net.Socket()
const client = new Modbus.client.TCP(socket,3)//add unitId
const options = {
  'host': '192.168.32.103',
  'port': '502'
}
//const client = new modbus.client.TCP(socket,247)

socket.on('connect', function () {
  client.readHoldingRegisters(4999, 2)//logger  fc 3
  //client.readDiscreteInputs(8020, 2)
  //client.readCoils(7999, 1)
  //client.readInputRegisters(7012, 6)//logger fc 4
    .then(function (resp) {
      console.log(resp.response._body.valuesAsArray)
      
      
      socket.end()
    }).catch(function () {
      console.error(require('util').inspect(arguments, {
        depth: null
      }))
      socket.end()
    })
})

socket.on('error', console.error)
socket.connect(options)