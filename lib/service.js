'use strict';
/* jshint -W097 */
/* globals module, require */

const winston = require('winston'),
    mqtt = require('mqtt'),
    q = require('q'),
    FirebaseChannel = require('./channels/firebasechannel.js');

/**
 * Initiates the data sync service
 * @class
 * @constructor
 * @param {ServiceConfig} config the service configuration
 */
function Service(config) {

    var channel = null,
        mqttClient = null;

    function initialise() {
        winston.info('Starting up...');
        channel = new FirebaseChannel(config.channel);
        connectToMQTTServer()
            .then(connectToChannel)
            .then(wireUp)
            .then(function success() {
                winston.info('Initialisation complete.');
            })
            .done();
    }

    function connectToMQTTServer() {
        var deferred = q.defer();

        winston.info('Connecting to ' + config.mqttURL + '...');
        mqttClient = mqtt.connect(config.mqttURL);
        mqttClient.on('connect', function() {
            winston.info('Connected.');
            deferred.resolve();
        });
        return deferred.promise;
    }

    function connectToChannel() {
        winston.info('Connecting to channel...');
        return channel
            .connect()
            .then(function success() {
                winston.log('Connected.');
            });
    }

    function wireUp() {
        var deferred = q.defer();
        mqttClient.on('message', function(topic, message) {
            winston.info('RCV: ' + topic + ' ' + message);
            channel.accept(topic, message);
        });
        mqttClient.subscribe(config.query, function result(err, granted) {
            if (err) {
                deferred.reject(err);
            } else {
                var grant = granted[0];
                winston.info('Subscription to ' + grant.topic + ' at QOS ' + grant.qos);
                deferred.resolve();
            }
        });
        return deferred.promise;
    }

    initialise();
}

module.exports = Service;
