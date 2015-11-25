var util = require('util');
var EventEmitter = require('events').EventEmitter;

//check whether the HTML5 History is supported in the current environment
var supported = typeof window !== 'undefined' && typeof window.history !== 'undefined';

/**
 * Location
 * @constructor
 */
function HistoryLocation() {
  this.onPopState = this.onPopState.bind(this);
}
util.inherits(HistoryLocation, EventEmitter);

/**
 * Start listening for location events
 * @returns {HistoryLocation}
 */
HistoryLocation.prototype.register = function() {
  if (supported) {
    window.addEventListener('popstate', this.onPopState);
  }
  return this;
};

/**
 * Stop listening for location events
 * @returns {HistoryLocation}
 */
HistoryLocation.prototype.unregister = function() {
  if (supported) {
    window.removeEventListener('popstate', this.onPopState);
  }
  return this;
};

/**
 * Navigate to a URL
 * @param   {string} url
 * @returns {HistoryLocation}
 */
HistoryLocation.prototype.navigate = function(url) {
  if (supported) {
    window.history.pushState({}, null, url);
    this.onPopState({state: {}});
  }
  return this;
};

/**
 * Handle navigate events
 * @param {} event
 */
HistoryLocation.prototype.onPopState = function(event) {
  if (event.state) {//state is null on page load
    this.emit('changed', document.location.pathname + document.location.search);
  }
};

module.exports = HistoryLocation;