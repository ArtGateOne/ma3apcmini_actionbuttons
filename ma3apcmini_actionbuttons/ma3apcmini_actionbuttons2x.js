//ma3apcmini mk2 action buttons 2x v1.0.7 by ArtGateOne

var easymidi = require('easymidi');
var osc = require('osc')

//config
midi_in = 'APC mini mk2';     //set correct midi in device name
midi_out = 'APC mini mk2';    //set correct midi out device name
midi2_in = 'APC mini mk21';     //set correct midi in device name
midi2_out = 'APC mini mk21';    //set correct midi out device name
localip = "127.0.0.1";
localport = 8008;   //recive port from ma3
remoteip = "127.0.0.1";
remoteport = 8000;  //send port to ma3


//Config 

color_executor_empty = 0;
color_executor_off = 9;
color_executor_on = 21;
color_logo = 60;
brightness = 6;     //brightness 0-6
executor_fx = 7;    //fx 7-15
fader_indicator = 1;//o = off, 1 = on

//Right side buttons (10)
var command_1 = "Page 1"; //clip stop
var command_2 = "Page 2"; //solo
var command_3 = "Page 3"; //mute
var command_4 = "Page 4"; //rec arm
var command_5 = "Page 5"; //select
var command_6 = "Page 6"; //drum
var command_7 = "Page 7"; //note
var command_8 = "Page 8"; //stop all clips

var Fader = [0, 0, 0, 0, 0, 0, 0, 0];

var GrandMaster = 100;
interval_on = 0;

var page = 1;
var BO = 0;
var clear = 0;

//MIDI
//display info
console.log("Akai APCmini mk2 MA3 OSC Action Buttons 2x");
console.log(" ");

//display all midi devices
console.log("Midi IN");
console.log(easymidi.getInputs());
console.log("Midi OUT");
console.log(easymidi.getOutputs());

console.log(" ");

console.log("Connecting to midi device: " + midi_in);

var input = new easymidi.Input(midi_in);  //Open midi in
var output = new easymidi.Output(midi_out);//Open midi out

console.log("Connecting to midi device: " + midi2_in);

var input2 = new easymidi.Input(midi2_in);  //Open midi in
var output2 = new easymidi.Output(midi2_out);//Open midi out

midiclear();

output.send('noteon', { note: page + 111, velocity: 1, channel: 0 }); // Page led
output2.send('noteon', { note: page + 111, velocity: 1, channel: 0 }); // Page led


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


// Create an osc.js UDP Port listening on port 8000.
var udpPort = new osc.UDPPort({
  localAddress: localip,
  localPort: localport,
  metadata: true
});




// Listen for incoming OSC messages.
udpPort.on("message", function (oscMsg, timeTag, info) {

  //console.log(oscMsg);

  if (clear == 0) {
    midiclear();
    clear = 1;
  }

  if (oscMsg.address == "/Page") {
    change_page(oscMsg.args[0].value);
  }
  
  else if (oscMsg.address == "/Key201") { light_fader(100, oscMsg.args[0].value); }
  else if (oscMsg.address == "/Key202") { light_fader(101, oscMsg.args[0].value); }
  else if (oscMsg.address == "/Key203") { light_fader(102, oscMsg.args[0].value); }
  else if (oscMsg.address == "/Key204") { light_fader(103, oscMsg.args[0].value); }
  else if (oscMsg.address == "/Key205") { light_fader(104, oscMsg.args[0].value); }
  else if (oscMsg.address == "/Key206") { light_fader(105, oscMsg.args[0].value); }
  else if (oscMsg.address == "/Key207") { light_fader(106, oscMsg.args[0].value); }
  else if (oscMsg.address == "/Key208") { light_fader(107, oscMsg.args[0].value); }
  else if (oscMsg.address == "/Key209") { light_fader2(100, oscMsg.args[0].value); }
  else if (oscMsg.address == "/Key210") { light_fader2(101, oscMsg.args[0].value); }
  else if (oscMsg.address == "/Key211") { light_fader2(102, oscMsg.args[0].value); }
  else if (oscMsg.address == "/Key212") { light_fader2(103, oscMsg.args[0].value); }
  else if (oscMsg.address == "/Key213") { light_fader2(104, oscMsg.args[0].value); }
  else if (oscMsg.address == "/Key214") { light_fader2(105, oscMsg.args[0].value); }
  else if (oscMsg.address == "/Key215") { light_fader2(106, oscMsg.args[0].value); }
  
  else if (oscMsg.address == "/Key301") { light_executor(0, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key302") { light_executor(1, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key303") { light_executor(2, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key304") { light_executor(3, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key305") { light_executor(4, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key306") { light_executor(5, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key307") { light_executor(6, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key308") { light_executor(7, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key309") { light_executor2(0, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key310") { light_executor2(1, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key311") { light_executor2(2, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key312") { light_executor2(3, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key313") { light_executor2(4, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key314") { light_executor2(5, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key315") { light_executor2(6, oscMsg.args[0].value, oscMsg.args[1].value); }

  else if (oscMsg.address == "/Key401") { light_executor(8, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key402") { light_executor(9, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key403") { light_executor(10, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key404") { light_executor(11, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key405") { light_executor(12, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key406") { light_executor(13, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key407") { light_executor(14, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key408") { light_executor(15, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key409") { light_executor2(8, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key410") { light_executor2(9, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key411") { light_executor2(10, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key412") { light_executor2(11, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key413") { light_executor2(12, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key414") { light_executor2(13, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key415") { light_executor2(14, oscMsg.args[0].value, oscMsg.args[1].value); }

  else if (oscMsg.address == "/Key176") { light_executor(16, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key177") { light_executor(17, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key178") { light_executor(18, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key179") { light_executor(19, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key180") { light_executor(20, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key181") { light_executor(21, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key182") { light_executor(22, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key183") { light_executor(23, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key184") { light_executor2(16, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key185") { light_executor2(17, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key186") { light_executor2(18, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key187") { light_executor2(19, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key188") { light_executor2(20, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key189") { light_executor2(21, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key190") { light_executor2(22, oscMsg.args[0].value, oscMsg.args[1].value); }

  else if (oscMsg.address == "/Key161") { light_executor(24, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key162") { light_executor(25, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key163") { light_executor(26, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key164") { light_executor(27, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key165") { light_executor(28, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key166") { light_executor(29, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key167") { light_executor(30, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key168") { light_executor(31, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key169") { light_executor2(24, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key170") { light_executor2(25, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key171") { light_executor2(26, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key172") { light_executor2(27, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key173") { light_executor2(28, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key174") { light_executor2(29, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key175") { light_executor2(30, oscMsg.args[0].value, oscMsg.args[1].value); }

  else if (oscMsg.address == "/Key146") { light_executor(32, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key147") { light_executor(33, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key148") { light_executor(34, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key149") { light_executor(35, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key150") { light_executor(36, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key151") { light_executor(37, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key152") { light_executor(38, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key153") { light_executor(39, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key154") { light_executor2(32, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key155") { light_executor2(33, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key156") { light_executor2(34, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key157") { light_executor2(35, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key158") { light_executor2(36, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key159") { light_executor2(37, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key160") { light_executor2(38, oscMsg.args[0].value, oscMsg.args[1].value); }

  else if (oscMsg.address == "/Key131") { light_executor(40, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key132") { light_executor(41, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key133") { light_executor(42, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key134") { light_executor(43, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key135") { light_executor(44, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key136") { light_executor(45, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key137") { light_executor(46, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key138") { light_executor(47, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key139") { light_executor2(40, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key140") { light_executor2(41, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key141") { light_executor2(42, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key142") { light_executor2(43, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key143") { light_executor2(44, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key144") { light_executor2(45, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key145") { light_executor2(46, oscMsg.args[0].value, oscMsg.args[1].value); }
  
  else if (oscMsg.address == "/Key116") { light_executor(48, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key117") { light_executor(49, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key118") { light_executor(50, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key119") { light_executor(51, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key120") { light_executor(52, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key121") { light_executor(53, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key122") { light_executor(54, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key123") { light_executor(55, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key124") { light_executor2(48, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key125") { light_executor2(49, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key126") { light_executor2(50, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key127") { light_executor2(51, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key128") { light_executor2(52, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key129") { light_executor2(53, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key130") { light_executor2(54, oscMsg.args[0].value, oscMsg.args[1].value); }
  
  else if (oscMsg.address == "/Key101") { light_executor(56, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key102") { light_executor(57, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key103") { light_executor(58, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key104") { light_executor(59, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key105") { light_executor(60, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key106") { light_executor(61, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key107") { light_executor(62, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key108") { light_executor(63, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key109") { light_executor2(56, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key110") { light_executor2(57, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key111") { light_executor2(58, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key112") { light_executor2(59, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key113") { light_executor2(60, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key114") { light_executor2(61, oscMsg.args[0].value, oscMsg.args[1].value); }
  else if (oscMsg.address == "/Key115") { light_executor2(62, oscMsg.args[0].value, oscMsg.args[1].value); }
});

// Open the socket.
udpPort.open();


// When the port is read, send an OSC message to, say, SuperCollider
udpPort.on("ready", function () {

  console.log("READY");
  console.log("Please start the OSC plugin to receive LED feedback.");
  udpPort.send(
        {
          address: "/cmd",
          args: [{ type: "s", value: "Plugin 1 Execute"  }],
        },
        remoteip,
        remoteport
      );
});




input.on('cc', function (msg) {//Fader send OSC

  if (msg.controller >= 48 && msg.controller <= 55) {
    var OSCaddress = "/Fader20" + (msg.controller - 47);
    Fader[msg.controller - 48] = msg.value;
    udpPort.send({ address: OSCaddress, args: [{ type: "i", value: msg.value }] }, remoteip, remoteport);
  }
});

input2.on('cc', function (msg) {//Fader send OSC

  if (msg.controller >= 48 && msg.controller <= 54) {
    var OSCaddress = "/Fader20" + (msg.controller - 39);
    Fader[msg.controller - 48] = msg.value;
    udpPort.send({ address: OSCaddress, args: [{ type: "i", value: msg.value }] }, remoteip, remoteport);
  }
  else if (msg.controller == 56) {//Grand Master Fader
    GrandMaster = msg.value * 0.8;

    if (BO == 0) {
      udpPort.send({
        address: "/cmd", args: [{ type: "s", value: "Master 2.1 At " + (GrandMaster) }]
      }, remoteip, remoteport);
    }
  }

});


input.on('noteon', function (msg) {//recive midi keys and send to osc

  if (msg.note >= 0 && msg.note <= 7) {
    udpPort.send({ address: "/Key" + (msg.note + 301), args: [{ type: "i", value: 1 }] }, remoteip, remoteport);
  }
  else if (msg.note >= 8 && msg.note <= 15) {
    udpPort.send({ address: "/Key" + (msg.note + 393), args: [{ type: "i", value: 1 }] }, remoteip, remoteport);
  }
  else if (msg.note >= 16 && msg.note <= 23) {
    udpPort.send({ address: "/Key" + (msg.note + 160), args: [{ type: "i", value: 1 }] }, remoteip, remoteport);
  }
  else if (msg.note >= 24 && msg.note <= 31) {
    udpPort.send({ address: "/Key" + (msg.note + 137), args: [{ type: "i", value: 1 }] }, remoteip, remoteport);
  }
  else if (msg.note >= 32 && msg.note <= 39) {
    udpPort.send({ address: "/Key" + (msg.note + 114), args: [{ type: "i", value: 1 }] }, remoteip, remoteport);
  }
  else if (msg.note >= 40 && msg.note <= 47) {
    udpPort.send({ address: "/Key" + (msg.note + 91), args: [{ type: "i", value: 1 }] }, remoteip, remoteport);
  }
  else if (msg.note >= 48 && msg.note <= 55) {
    udpPort.send({ address: "/Key" + (msg.note + 68), args: [{ type: "i", value: 1 }] }, remoteip, remoteport);
  }
  else if (msg.note >= 56 && msg.note <= 63) {
    udpPort.send({ address: "/Key" + (msg.note + 45), args: [{ type: "i", value: 1 }] }, remoteip, remoteport);
  }
  else if (msg.note >= 100 && msg.note <= 107) {
    udpPort.send({ address: "/Key" + (msg.note + 101), args: [{ type: "i", value: 1 }] }, remoteip, remoteport);
  }
  else if (msg.note == 112) {
    light_page_button(msg.note);
    udpPort.send({ address: "/cmd", args: [{ type: "s", value: command_1 }] }, remoteip, remoteport);
  }
  else if (msg.note == 113) {
    light_page_button(msg.note);
    udpPort.send({ address: "/cmd", args: [{ type: "s", value: command_2 }] }, remoteip, remoteport);
  }
  else if (msg.note == 114) {
    light_page_button(msg.note);
    udpPort.send({ address: "/cmd", args: [{ type: "s", value: command_3 }] }, remoteip, remoteport);
  }
  else if (msg.note == 115) {
    light_page_button(msg.note);
    udpPort.send({ address: "/cmd", args: [{ type: "s", value: command_4 }] }, remoteip, remoteport);
  }
  else if (msg.note == 116) {
    light_page_button(msg.note);
    udpPort.send({ address: "/cmd", args: [{ type: "s", value: command_5 }] }, remoteip, remoteport);
  }
  else if (msg.note == 117) {
    light_page_button(msg.note);
    udpPort.send({ address: "/cmd", args: [{ type: "s", value: command_6 }] }, remoteip, remoteport);
  }
  else if (msg.note == 118) {
    light_page_button(msg.note);
    udpPort.send({ address: "/cmd", args: [{ type: "s", value: command_7 }] }, remoteip, remoteport);
  }
  else if (msg.note == 119) {
    light_page_button(msg.note);
    udpPort.send({ address: "/cmd", args: [{ type: "s", value: command_8 }] }, remoteip, remoteport);
  }
});

input2.on('noteon', function (msg) {//recive midi keys and send to osc

  if (msg.note >= 0 && msg.note <= 6) {
    udpPort.send({ address: "/Key" + (msg.note + 309), args: [{ type: "i", value: 1 }] }, remoteip, remoteport);
  }
  else if (msg.note >= 8 && msg.note <= 14) {
    udpPort.send({ address: "/Key" + (msg.note + 401), args: [{ type: "i", value: 1 }] }, remoteip, remoteport);
  }
  else if (msg.note >= 16 && msg.note <= 22) {
    udpPort.send({ address: "/Key" + (msg.note + 168), args: [{ type: "i", value: 1 }] }, remoteip, remoteport);
  }
  else if (msg.note >= 24 && msg.note <= 30) {
    udpPort.send({ address: "/Key" + (msg.note + 145), args: [{ type: "i", value: 1 }] }, remoteip, remoteport);
  }
  else if (msg.note >= 32 && msg.note <= 38) {
    udpPort.send({ address: "/Key" + (msg.note + 122), args: [{ type: "i", value: 1 }] }, remoteip, remoteport);
  }
  else if (msg.note >= 40 && msg.note <= 46) {
    udpPort.send({ address: "/Key" + (msg.note + 99), args: [{ type: "i", value: 1 }] }, remoteip, remoteport);
  }
  else if (msg.note >= 48 && msg.note <= 54) {
    udpPort.send({ address: "/Key" + (msg.note + 76), args: [{ type: "i", value: 1 }] }, remoteip, remoteport);
  }
  else if (msg.note >= 56 && msg.note <= 62) {
    udpPort.send({ address: "/Key" + (msg.note + 53), args: [{ type: "i", value: 1 }] }, remoteip, remoteport);
  }
  else if (msg.note >= 100 && msg.note <= 106) {
    udpPort.send({ address: "/Key" + (msg.note + 109), args: [{ type: "i", value: 1 }] }, remoteip, remoteport);
  }
  else if (msg.note == 112) {
    light_page_button(msg.note);
    udpPort.send({ address: "/cmd", args: [{ type: "s", value: command_1 }] }, remoteip, remoteport);
  }
  else if (msg.note == 113) {
    light_page_button(msg.note);
    udpPort.send({ address: "/cmd", args: [{ type: "s", value: command_2 }] }, remoteip, remoteport);
  }
  else if (msg.note == 114) {
    light_page_button(msg.note);
    udpPort.send({ address: "/cmd", args: [{ type: "s", value: command_3 }] }, remoteip, remoteport);
  }
  else if (msg.note == 115) {
    light_page_button(msg.note);
    udpPort.send({ address: "/cmd", args: [{ type: "s", value: command_4 }] }, remoteip, remoteport);
  }
  else if (msg.note == 116) {
    light_page_button(msg.note);
    udpPort.send({ address: "/cmd", args: [{ type: "s", value: command_5 }] }, remoteip, remoteport);
  }
  else if (msg.note == 117) {
    light_page_button(msg.note);
    udpPort.send({ address: "/cmd", args: [{ type: "s", value: command_6 }] }, remoteip, remoteport);
  }
  else if (msg.note == 118) {
    light_page_button(msg.note);
    udpPort.send({ address: "/cmd", args: [{ type: "s", value: command_7 }] }, remoteip, remoteport);
  }
  else if (msg.note == 119) {
    light_page_button(msg.note);
    udpPort.send({ address: "/cmd", args: [{ type: "s", value: command_8 }] }, remoteip, remoteport);
  }
  else if (msg.note == 122) {//BO
    BO = 1;
    udpPort.send({ address: "/cmd", args: [{ type: "s", value: "Master 2.1 At 0" }] }, remoteip, remoteport);
  }
});

input.on('noteoff', function (msg) {//recive midi keys and send to osc

  if (msg.note >= 0 && msg.note <= 7) {
    udpPort.send({ address: "/Key" + (msg.note + 301), args: [{ type: "i", value: 0 }] }, remoteip, remoteport);
  }
  else if (msg.note >= 8 && msg.note <= 15) {
    udpPort.send({ address: "/Key" + (msg.note + 393), args: [{ type: "i", value: 0 }] }, remoteip, remoteport);
  }
  else if (msg.note >= 16 && msg.note <= 23) {
    udpPort.send({ address: "/Key" + (msg.note + 160), args: [{ type: "i", value: 0 }] }, remoteip, remoteport);
  }
  else if (msg.note >= 24 && msg.note <= 31) {
    udpPort.send({ address: "/Key" + (msg.note + 137), args: [{ type: "i", value: 0 }] }, remoteip, remoteport);
  }
  else if (msg.note >= 32 && msg.note <= 39) {
    udpPort.send({ address: "/Key" + (msg.note + 114), args: [{ type: "i", value: 0 }] }, remoteip, remoteport);
  }
  else if (msg.note >= 40 && msg.note <= 47) {
    udpPort.send({ address: "/Key" + (msg.note + 91), args: [{ type: "i", value: 0 }] }, remoteip, remoteport);
  }
  else if (msg.note >= 48 && msg.note <= 55) {
    udpPort.send({ address: "/Key" + (msg.note + 68), args: [{ type: "i", value: 0 }] }, remoteip, remoteport);
  }
  else if (msg.note >= 56 && msg.note <= 63) {
    udpPort.send({ address: "/Key" + (msg.note + 45), args: [{ type: "i", value: 0 }] }, remoteip, remoteport);
  }
  else if (msg.note >= 100 && msg.note <= 107) {
    udpPort.send({ address: "/Key" + (msg.note + 101), args: [{ type: "i", value: 0 }] }, remoteip, remoteport);
  }
});

input2.on('noteoff', function (msg) {//recive midi keys and send to osc

  if (msg.note >= 0 && msg.note <= 6) {
    udpPort.send({ address: "/Key" + (msg.note + 309), args: [{ type: "i", value: 0 }] }, remoteip, remoteport);
  }
  else if (msg.note >= 8 && msg.note <= 14) {
    udpPort.send({ address: "/Key" + (msg.note + 401), args: [{ type: "i", value: 0 }] }, remoteip, remoteport);
  }
  else if (msg.note >= 16 && msg.note <= 22) {
    udpPort.send({ address: "/Key" + (msg.note + 168), args: [{ type: "i", value: 0 }] }, remoteip, remoteport);
  }
  else if (msg.note >= 24 && msg.note <= 30) {
    udpPort.send({ address: "/Key" + (msg.note + 145), args: [{ type: "i", value: 0 }] }, remoteip, remoteport);
  }
  else if (msg.note >= 32 && msg.note <= 38) {
    udpPort.send({ address: "/Key" + (msg.note + 122), args: [{ type: "i", value: 0 }] }, remoteip, remoteport);
  }
  else if (msg.note >= 40 && msg.note <= 46) {
    udpPort.send({ address: "/Key" + (msg.note + 99), args: [{ type: "i", value: 0 }] }, remoteip, remoteport);
  }
  else if (msg.note >= 48 && msg.note <= 54) {
    udpPort.send({ address: "/Key" + (msg.note + 76), args: [{ type: "i", value: 0 }] }, remoteip, remoteport);
  }
  else if (msg.note >= 56 && msg.note <= 62) {
    udpPort.send({ address: "/Key" + (msg.note + 53), args: [{ type: "i", value: 0 }] }, remoteip, remoteport);
  }
  else if (msg.note >= 100 && msg.note <= 106) {
    udpPort.send({ address: "/Key" + (msg.note + 109), args: [{ type: "i", value: 0 }] }, remoteip, remoteport);
  }
  else if (msg.note == 122) {//BO
    BO = 0;
    udpPort.send({ address: "/cmd", args: [{ type: "s", value: "Master 2.1 At " + (GrandMaster) }] }, remoteip, remoteport);
  }
});

//midi clear function
function midiclear() {
  for (var i = 0; i < 128; i++) {
    output.send('noteon', { note: i, velocity: 0, channel: 0 });
    output2.send('noteon', { note: i, velocity: 0, channel: 0 });
    //sleep(10, function () { });
  }
  return;
}

function light_executor(note, status, color) {
  channel = brightness;

  if (color == "#000000") {
    if (status == 1) {
      velocity = color_executor_on;
    } else if (status == 0) {
      velocity = color_executor_off;
    } else {
      velocity = color_executor_empty;
    }
    output.send('noteon', { note: note, velocity: velocity, channel: channel });
  } else {
    if (status == 1) {
      channel = executor_fx;
      velocity = getClosestVelocity(color);
      output.send('noteon', { note: note, velocity: velocity, channel: channel });
    } else if (status == 0){
      output.send('noteon', { note: note, velocity: 0, channel: 0 });
      setPadColorHEX(output, note, color);
    }
  }

  return;
}

function light_executor2(note, status, color) {
  channel = brightness;

  if (color == "#000000") {
    if (status == 1) {
      velocity = color_executor_on;
    } else if (status == 0) {
      velocity = color_executor_off;
    } else {
      velocity = color_executor_empty;
    }
    output2.send('noteon', { note: note, velocity: velocity, channel: channel });
  } else {
    if (status == 1) {
      channel = executor_fx;
      velocity = getClosestVelocity(color);
      output2.send('noteon', { note: note, velocity: velocity, channel: channel });
    } else if (status == 0){
      output2.send('noteon', { note: note, velocity: 0, channel: 0 });
      setPadColorHEX(output2, note, color);
    }
  }

  return;
}

function light_page_button(note) {
  channel = brightness;
  output.send('noteon', { note: page + 111, velocity: 0, channel: 0 });
  output.send('noteon', { note: note, velocity: 1, channel: 0 });
  output2.send('noteon', { note: page + 111, velocity: 0, channel: 0 });
  output2.send('noteon', { note: note, velocity: 1, channel: 0 });
  page = note - 111;
}

function change_page(page_new) {
  output.send('noteon', { note: page + 111, velocity: 0, channel: 0 });
  output.send('noteon', { note: page_new + 111, velocity: 1, channel: 0 });
  output2.send('noteon', { note: page + 111, velocity: 0, channel: 0 });
  output2.send('noteon', { note: page_new + 111, velocity: 1, channel: 0 });
  page = page_new;
}


function light_fader(note, velocity) {

  output.send('noteon', { note: note, velocity: velocity, channel: 0 });

  return;
}

function light_fader2(note, velocity) {

  output2.send('noteon', { note: note, velocity: velocity, channel: 0 });

  return;
}

// Mapa kolorów do velocity
const colorToVelocity = {
  '#000000': 0, '#1E1E1E': 1, '#7F7F7F': 2, '#FFFFFF': 3,
  '#FF4C4C': 4, '#FF0000': 5, '#590000': 6, '#190000': 7,
  '#FFBD6C': 8, '#FF5400': 9, '#591D00': 10, '#271B00': 11,
  '#FFFF4C': 12, '#FFFF00': 13, '#595900': 14, '#191900': 15,
  '#88FF4C': 16, '#54FF00': 17, '#1D5900': 18, '#142B00': 19,
  '#4CFF4C': 20, '#00FF00': 21, '#005900': 22, '#001900': 23,
  '#4CFF5E': 24, '#00FF19': 25, '#00590D': 26, '#001902': 27,
  '#4CFF88': 28, '#00FF55': 29, '#00591D': 30, '#001F12': 31,
  '#4CFFB7': 32, '#00FF99': 33, '#005935': 34, '#001912': 35,
  '#4CC3FF': 36, '#00A9FF': 37, '#004152': 38, '#001019': 39,
  '#4C88FF': 40, '#0055FF': 41, '#001D59': 42, '#000819': 43,
  '#4C4CFF': 44, '#0000FF': 45, '#000059': 46, '#000019': 47,
  '#874CFF': 48, '#5400FF': 49, '#190064': 50, '#0F0030': 51,
  '#FF4CFF': 52, '#FF00FF': 53, '#590059': 54, '#190019': 55,
  '#FF4C87': 56, '#FF0054': 57, '#59001D': 58, '#220013': 59,
  '#FF1500': 60, '#993500': 61, '#795100': 62, '#436400': 63,
  '#033900': 64, '#005735': 65, '#00547F': 66, '#0000FF': 67,
  '#00454F': 68, '#2500CC': 69, '#7F7F7F': 70, '#202020': 71,
  '#FF0000': 72, '#BDFF2D': 73, '#AFED06': 74, '#64FF09': 75,
  '#108B00': 76, '#00FF87': 77, '#00A9FF': 78, '#002AFF': 79,
  '#3F00FF': 80, '#7A00FF': 81, '#B21A7D': 82, '#402100': 83,
  '#FF4A00': 84, '#88E106': 85, '#72FF15': 86, '#00FF00': 87,
  '#3BFF26': 88, '#59FF71': 89, '#38FFCC': 90, '#5B8AFF': 91,
  '#3151C6': 92, '#877FE9': 93, '#D31DFF': 94, '#FF005D': 95,
  '#FF7F00': 96, '#B9B000': 97, '#90FF00': 98, '#835D07': 99,
  '#392b00': 100, '#144C10': 101, '#0D5038': 102, '#15152A': 103,
  '#16205A': 104, '#693C1C': 105, '#A8000A': 106, '#DE513D': 107,
  '#D86A1C': 108, '#FFE126': 109, '#9EE12F': 110, '#67B50F': 111,
  '#1E1E30': 112, '#DCFF6B': 113, '#80FFBD': 114, '#9A99FF': 115,
  '#8E66FF': 116, '#404040': 117, '#757575': 118, '#E0FFFF': 119,
  '#A00000': 120, '#350000': 121, '#1AD000': 122, '#074200': 123,
  '#B9B000': 124, '#3F3100': 125, '#B35F00': 126, '#4B1502': 127
};

// Funkcja konwertująca kolor z heksadecymalnego na wartości RGB z walidacją
function hexToRgb(hex) {
  if (!/^#([0-9A-F]{3}){1,2}$/i.test(hex)) {
    throw new Error('Nieprawidłowy format koloru: ' + hex);
  }
  let bigint = parseInt(hex.slice(1), 16);
  let r = (bigint >> 16) & 255;
  let g = (bigint >> 8) & 255;
  let b = bigint & 255;
  return { r, g, b };
}

// Funkcja obliczająca odległość Manhattan między dwoma kolorami RGB
function colorDistanceManhattan(color1, color2) {
  return Math.abs(color1.r - color2.r) +
    Math.abs(color1.g - color2.g) +
    Math.abs(color1.b - color2.b);
}

// Funkcja zwracająca velocity dla najbardziej zbliżonego koloru
function getClosestVelocity(color) {
  let targetRgb = hexToRgb(color);
  let closestColor = null;
  let closestDistance = Infinity;

  for (let key in colorToVelocity) {
    let currentRgb = hexToRgb(key);
    let distance = colorDistanceManhattan(targetRgb, currentRgb);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestColor = key;
    }
  }

  return colorToVelocity[closestColor];
}

function setPadColorHEX(output, pad, hexColor) {
  // parsowanie HEX (#RRGGBB)
  const r = parseInt(hexColor.substr(1, 2), 16);
  const g = parseInt(hexColor.substr(3, 2), 16);
  const b = parseInt(hexColor.substr(5, 2), 16);

  // helper: rozbij 0–255 na MSB/LSB (7-bitowe)
  function split7(v) {
    return [(v >> 7) & 0x01, v & 0x7F];
  }

  const [rMSB, rLSB] = split7(r);
  const [gMSB, gLSB] = split7(g);
  const [bMSB, bLSB] = split7(b);

  // pełna ramka SysEx: F0 ... F7
  const msg = [
    0xF0,             // początek SysEx
    0x47, 0x7F, 0x4F, // ID producenta / device (Mk2)
    0x24,             // komenda "Set RGB Pad Color"
    0x00, 0x08,       // długość danych
    pad, pad,         // numer pada (dwukrotnie)
    rMSB, rLSB,       // czerwony
    gMSB, gLSB,       // zielony
    bMSB, bLSB,       // niebieski
    0xF7              // koniec SysEx
  ];

  output.send("sysex", msg);
}


process.on("SIGINT", () => {
  interval_on = 0;
  console.log("CTRL+C -> awaryjne wyjście");
  midiclear();
  //client.close();
  input.close();
  output.close();
  input2.close();
  output2.close();
  process.exit(1); // kod błędu
});

process.on("SIGHUP", () => {
  interval_on = 0;
  console.log("CTRL+C -> awaryjne wyjście");
  midiclear();
  //client.close();
  input.close();
  output.close();
  input2.close();
  output2.close();
  process.exit(1); // kod błędu
});

process.on("SIGTERM", () => {
  interval_on = 0;
  console.log("CTRL+C -> awaryjne wyjście");
  midiclear();
  //client.close();
  input.close();
  output.close();
  input2.close();
  output2.close();
  process.exit(1); // kod błędu
});

process.on("uncaughtException", (err) => {
  console.error("Nieobsłużony wyjątek:", err.message);
  // Możesz tu np. spróbować ponownie połączyć z kontrolerem
});