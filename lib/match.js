var parseUrl    = require('url').parse;
var parseQuery  = require('query-string').parse;
var toRegExp    = require('path-to-regexp');

/**
 *
 * @param   {String}        url
 * @param   {Array<Object>} routes
 * @returns {Object|null}
 */
export default function(url, routes) {

  const parsedUrl = parseUrl(url);
  const pathname = parsedUrl.pathname;

  for (let i = 0; i < routes.length; ++i) {
    const route = routes[i];

    //convert the pattern to a RegExp
    let keys = [];
    let regexp = route.pattern;
    if (!(regexp instanceof RegExp)) {
      if (regexp === '*') {
        regexp = new RegExp('.*');
      } else {
        regexp = toRegExp(regexp, keys);
      }
    }

    //check whether a new match was found or return the old match
    var matches = pathname.match(regexp);
    if (matches) {

      //extract the route params
      var params = parseQuery(parsedUrl.query || '');
      for (let j = 1; j < matches.length; ++j) {
        let key = keys[j - 1];
        if (!key) continue;
        params[key.name] = matches[j];
      }

      //return the matched route info
      return {
        name: route.name,
        params: params,
        handler: route.handler
      };

    }

  }

  return null;
}