var hapiSeneca = {
  register: function (server, options, next) {
    console.log('Looks like we got registered!');
    
    var seneca = options.seneca;
    debugger;
    seneca.act('role:web, cmd:routes', function(err, routes) {
      console.log(routes);
      debugger;
    });
    next();
  }
}

hapiSeneca.register.attributes = {
  name: 'hapi-seneca',
  version: '1.0.0'
};

module.exports = hapiSeneca;
