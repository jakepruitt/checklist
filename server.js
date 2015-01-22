var Hapi = require('hapi');
var seneca = require('seneca')();

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

seneca.use('./server/api.js');

//seneca.use('user');
//seneca.use('auth', {secure: true});

api.route({
  method: 'GET',
  path: '/',
  handler: function(request, reply) {
    reply('There is always money in the banana boat');
  }
});

api.register({
  register: require('./hapi-seneca'),
  options: { seneca: seneca }
}, function(err) {
  if (err) {
    console.error(err);
  } else {
    server.start(function () {
      console.log('Server running at: %d and %d', server.connections[0].info.port, server.connections[1].info.port);
    });
  }
});
