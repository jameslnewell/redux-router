import match from '../lib/match';

describe('match', () => {

  it('should return null when there are no routes', () => {

    const routes = [];
    expect(match('/abcdefghijklmnops', routes)).to.be.equal(null);

  });

  it('should return null when there are no matching routes', () => {

    const
      contact = function() {}
    ;
    const routes = [
      {name: 'contact', pattern: '/contact-us', handler: contact}
    ];
    expect(match('/abcdefghijklmnops', routes)).to.be.equal(null);

  });

  it('should return route data when there is a single matching route', () => {

    const
      contact = function() {}
    ;
    const routes = [
      {name: 'contact', pattern: '/contact-us', handler: contact}
    ];

    expect(match('/contact-us', routes)).to.be.deep.equal({
      name: 'contact',
      params: {},
      handler: contact
    });

  });

  it('should return the correct route data when there are multiple routes', () => {

    const
      home = function home() {},
      about = function about() {},
      contact = function contact() {}
    ;
    const routes = [
      {name: 'home', pattern: '/', handler: home},
      {name: 'about', pattern: '/about-us', handler: about},
      {name: 'contact', pattern: '/contact-us', handler: contact}
    ];

    expect(match('/contact-us', routes)).to.be.deep.equal({
      name: 'contact',
      params: {},
      handler: contact
    });

  });

  it('should return some params when the route pattern contains named parameters', () => {

    const
      handler = function() {}
    ;
    const routes = [
      {name: 'profile', pattern: '/~:username', handler}
    ];

    expect(match('/~jameslnewell', routes).params).to.be.deep.equal({
      username: 'jameslnewell'
    });

  });

});