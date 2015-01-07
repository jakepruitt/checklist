var Hapi = require('hapi');

var server = new Hapi.Server();
var web = server.connection({ port: 4000 });
var api = server.connection({ port: 4040 });

server.route({
  method: 'GET',
  path: '/{param*}',
  handler: {
    directory: {
      path: 'client'
    }
  }
});

server.start(function () {
  console.log('Server running at:', server.info.uri);
});
