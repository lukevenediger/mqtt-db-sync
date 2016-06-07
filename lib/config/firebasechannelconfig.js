'use strict';
/* jshint -W097 */
/* globals module */

/**
 * Defines a channel that syncs data to Firebase
 * @constructor
 */
function FirebaseChannelConfig() {

    this.databaseURL = null;
    this.serviceAccount = null;
}

module.exports = FirebaseChannelConfig;
