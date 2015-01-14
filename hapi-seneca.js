var hapiSeneca = {
  register: function (server, options, next) {
    console.log('Looks like we got registered!');
    
    var seneca = options.seneca;
    debugger;
    seneca.act('role:web, cmd:routes', function(err, routes) {
      console.log(routes);
      var testRoute = routes[0];
      server.route({
        method: testRoute.method,
        path: testRoute.url,
        handler: function(request, reply) {
          reply('yeah, buddy');
        }
      });
    });
    next();
  }
};

hapiSeneca.register.attributes = {
  name: 'hapi-seneca',
  version: '1.0.0'
};

module.exports = hapiSeneca;
