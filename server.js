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

var user_pin = seneca.pin({role:'user', cmd:'*'});

api.route({
  method: 'GET',
  path: '/',
  handler: function(request, reply) {
    reply('There is always money in the banana boat');
  }
});

api.register({
  register: require('hapi-seneca'),
  options: { 
    seneca: seneca,
    cors: true
  }
}, function(err) {
  if (err) {
    console.error(err);
  } else {
    user_pin.register({
      username: 'a1',
      password: 'a1'
    }, function(err, out) {
      server.start(function () {
        console.log('Server running at: %d and %d', server.connections[0].info.port, server.connections[1].info.port);
      });
      console.log(out);
    });
  }
});
