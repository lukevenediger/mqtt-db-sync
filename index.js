#!/usr/bin/env node
'use strict';
/* jshint -W097 */
/* globals require */
var //program = require('commander'),
    //pkg = require('./package.json'),
    RootConfig = require('./lib/config/serviceconfig.js'),
    FirebaseChannelConfig = require('./lib/config/firebasechannelconfig.js'),
    Service = require('./lib/service.js');

var config = new RootConfig();
config.mqttURL = 'mqtt://localhost';
config.query = 'hello/#';
config.channel = new FirebaseChannelConfig();
config.channel.databaseURL = 'https://mqtt-db-sync.firebaseio.com';
config.channel.serviceAccount = require('./mqtt-db-sync.json');

new Service(config);

