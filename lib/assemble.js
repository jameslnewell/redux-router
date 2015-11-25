var toRegExp = require('path-to-regexp');

export default function(name, params, routes) {

  for (var i=0; i<this._routes.length; ++i) {
    var route = this._routes[i];
    if (route.name === name) {
      var compile = toRegExp.compile(route.pattern);
      return compile(params || {});
    }
  }

  return null;
}