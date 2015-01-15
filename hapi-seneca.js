var hapiSeneca = {
  register: function (server, options, next) {
    console.log('Looks like we got registered!');
    
    var seneca = options.seneca;
    debugger;
    seneca.act('role:web, cmd:routes', function(err, routes) {
      console.log(routes);
      seneca.act('role:web, cmd:list', function(err, services) {
        var testRoute = routes.filter(function(route) { 
          return route.url === '/api/1.0/test' 
        }).shift(); 
        console.log(testRoute);
        var testService = services.filter(function(service) {
          return service.serviceid$ === testRoute.service.serviceid 
        }).shift();
        console.log(testService);
        server.route({
          method: testRoute.method,
          path: testRoute.url,
          handler: function(req, reply) {
            console.log('Handler called!');
            testService(req,reply('Hello world!'),next);
          }
        });
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
