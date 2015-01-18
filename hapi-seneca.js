var hapiSeneca = {
  register: function (server, options, next) {
    var seneca = options.seneca;
    
    server.ext('onRequest', function(request, reply) {
      var req = request.raw.req;
      var status = 200;
      var headers = {};
      var res = {
        writeHead: function(resStatus, resHeaders) { 
          status = resStatus;
          headers = resHeaders;
        },
        end: function(objstr) { 
          var res = reply(objstr); 
          res.code(status);
          for (header in headers) {
            res.header(header, headers[header]);
          }
        }
      };
      seneca.export('web')(req, res, function(err) {
        if (err) { return reply(err); }
        reply.continue();
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
