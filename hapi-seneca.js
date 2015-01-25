var hapiSeneca = {
  register: function (server, options, next) {
    var seneca = options.seneca,
        status = 200,
        headers = {};

    server.decorate('reply', 'writeHead', function(resStatus, resHeaders) {
      status = resStatus;
      headers = resHeaders;
    });

    server.decorate('reply', 'end', function(objstr) {
      var reply = this,
          res = reply(objstr);
      res.code(status);
      for(header in headers) {
        res.header(header, headers[header]);
      }
    });

    server.decorate('reply', 'getHeader', function(headerName) {
      return headers[headerName];
    });

    server.decorate('reply', 'setHeader', function(headerName, headerValue) {
      headers[headerName] = headerValue;
    });
    
    server.ext('onPostAuth', function(request, reply) {
      var req = request.raw.req;
      req.body = request.payload;
      req.query = request.query;
      seneca.export('web')(req, reply, function(err) {
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
