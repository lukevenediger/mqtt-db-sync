'use strict';
/* jshint -W097 */
/* globals module */

/**
 * Base configuration object for the service
 * @class
 * @constructor
 */
function ServiceConfig() {

    this.mqttURL = null;
    this.query = null;
    this.channel = null;
}

module.exports = ServiceConfig;
