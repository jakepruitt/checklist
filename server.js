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

// Incorporate all needed plugins
seneca.use('user');
seneca.use('auth');
seneca.use('account');
seneca.use('project');
seneca.use('ng-web');
seneca.use('card');
seneca.use('mem-store', {web:{dump:true}});
seneca.use('./server/checklist.js');
seneca.use('./server/entry.js');

var user_pin = seneca.pin({role:'user', cmd:'*'});
var project_pin = seneca.pin({role:'project', cmd:'*'});
var checklist_pin = seneca.pin({role:'checklist', cmd:'*'});
var entry_pin = seneca.pin({role:'entry', cmd:'*'});

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
      console.log(out.user.accounts[0]);
      project_pin.save({name: 'Test project', account: out.user.accounts[0]}, function(err, out) {
        checklist_pin.new_checklist({
          title:'Test checklist',
          project: out.project.id
        }, function(err, out) {
          entry_pin.add_entry({ checklist:out.checklist.id, title:'test entry'}, function(err, out) {
            if (err) return console.error(err);
            server.start(function () {
              console.log('Server running at: %d and %d', server.connections[0].info.port, server.connections[1].info.port);
            });
            console.log(out);
          });
        });
      });
    });
  }
});
