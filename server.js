var Hapi = require('hapi');
var seneca = require('seneca')();
var app = require('express')();

var server = new Hapi.Server();
var web = server.connection({ port: 4000 });
var api = server.connection({ port: 4040 });

web.route({
  method: 'GET',
  path: '/{param*}',
  handler: {
    directory: {
      path: 'client'
    }
  },
  config: {
    description: 'Web app static content',
    notes: 'Set up to respond to web addressing',
    tags: ['app', 'checklist', 'spa']
  }
});

api.route({
  method: 'GET',
  path: '/',
  handler: function(request, reply) {
    reply('There is always money in the banana boat');
  }
});

seneca.add({role: 'test', cmd: 'test'}, function(args, done) {
  console.log('Recieved a request');
  done(null, {worked: true});
});

seneca.act('role:web', {use: {
  prefix: '/api/1.0',
  pin: {role:'test', cmd:'*'},
  map: {
    test: true
  }
}});

app.use(seneca.export('web'));
app.listen(3000);

server.start(function () {
  console.log('Server running at: %d and %d', server.connections[0].info.port, server.connections[1].info.port);
});
