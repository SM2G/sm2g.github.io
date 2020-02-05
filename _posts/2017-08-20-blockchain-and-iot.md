---
layout: post
title: "Blockchain and IoT"
categories: development
tags: blockchain linux
---

Here's a small script to open a JavaScript interface to interact with an IoT device. This interface can then be easily incorporated in a larger Blockchain project with real tangible everyday life objects. I'll cover the Blockchain aspect of this project in another article, focusing on *Hyperledger*.

The IoT device I'll be using for this project is an old *Violet Mir:ror*. This device is a simple RFID tag reader operating at 13.56MHz.
The device is shipped with Ztamps and Nabaztag bunnies, but it can also read standard RFID chips complying with this protocol. ISO/IEC 14443 consists of four parts and describes two types of cards: Type A and Type B, both of which communicate wirelessly at 13.56 MHz. Typically, a ISO 14443 tag has a range of 10cm. The 13.56MHz RFIDs have a broad range of applications across the world. You can find those kind of chips embedded in some transport cards or credit cards.

```javascript
// Interface requirement
var HID = require('node-hid');

var devices = new HID.devices(7592, 4865);
var hid;
if (!devices.length) {
  console.log("No mir:ror found");
} else {
  hid = new HID.HID(devices[0].path);
  //hid.write([03, 01]); //Disable sounds and lights
  hid.read(onRead);
}

function onRead(error, data) {
  var size;
  var id;
  var amount = 66;

  //get 64 bytes
  if (data[0] != 0) {

    console.log("\n" + data.map(function (v) {return ('00' + v.toString(16)).slice(-2)}).join(','));
    //console.log("RAW DATA: "+ data[10]);

    switch (data[0]) {
    case 1:
      // Mir:ror Orientation
      switch (data[1]) {
      case 4:
        console.log("-> Mir:ror up");
        break;
      case 5:
        console.log("-> Mir:ror down");
        break;
      }
      break;
    case 2:
      //RFID
      switch (data[1]) {
      case 1:
        console.log("-> RFID in, ID:" + data[11]);
        var sys = require('sys')
        var exec = require('child_process').exec;
        function puts(error, stdout, stderr) { sys.puts(stdout) }
        switch (data[11]) {
            case 65:
            console.log("<<< Hello Mr. Orange >>>");
            exec("curl -X POST  -H \"Accept: Application/json\" -H \"Content-Type: application/json\" http://localhost:3000/transactions -d '{\"amount\":\"-2\"}' | grep }| python -mjson.tool", puts);
            break;
            case 81:
            console.log("<<< Hello Ms. Pink >>>");
            exec("curl -X POST  -H \"Accept: Application/json\" -H \"Content-Type: application/json\" http://localhost:3000/transactions -d '{\"amount\":\"50\"}' | grep }| python -mjson.tool", puts);
            break;
            case 0:
            console.log("<<< Account hacked... >>>");
            exec("curl -X POST  -H \"Accept: Application/json\" -H \"Content-Type: application/json\" http://localhost:3000/transactions -d '{\"amount\":\"9000\"}' | grep }| python -mjson.tool", puts);
            break;
        }

        break;
      //case 2:
        //console.log("-> RFID out, ID:" + data[11]);
        //break;
      }

      size = data[4];
      id = (data.slice(0)).slice(5, size);
      //console.log(id.map(function (v) {return ('00' + v.toString(16)).slice(-2)}).join(','));
      break;
    }
  }
  hid.read(onRead);
}
```
