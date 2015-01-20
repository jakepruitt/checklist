module.exports = function(options) {
  var seneca = this;

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
}
