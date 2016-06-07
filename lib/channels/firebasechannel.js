'use strict';
/* jshint -W097 */
/* globals require, module */

const winston = require('winston'),
    firebase = require('firebase'),
    q = require('q');

/**
 * Syncs data with Firebase
 * @param {FirebaseChannelConfig} config configuration for the channel
 * @constructor
 */
function FirebaseChannel(config) {

    var app,
        db;

    function initialise() {
    }

    this.connect = function() {
        winston.info('Authenticating with ' + config.databaseURL);
        app = firebase.initializeApp({
            serviceAccount: config.serviceAccount,
            databaseURL: config.databaseURL
        });
        db = app.database();
        return q();
    };

    this.accept = function(topic, message) {
        var ref = db.ref(topic);
        ref.set(JSON.parse(message));
    };

    initialise();
}

module.exports = FirebaseChannel;
