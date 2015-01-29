var hapiSeneca = {
  register: function (server, options, next) {
    var seneca = options.seneca,
        status = 200,
        headers = {};

    // Create Hapi Default route handler
    var handler = function (request, reply) {
      return reply('The page was not found').code(404);
    };

    // Allow CORS based on cors option for plugin
    server.route({ 
      method: '*', 
      path: '/{p*}', 
      handler: handler, 
      config: { cors: options.cors }
    });
    
    server.decorate('reply', 'writeHead', function(resStatus, resHeaders) {
      console.log(this);
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

    server.ext('onPostHandler', function(request, reply) {
      request.response.header('test-header', 'test-value');
    });

    next();
  }
};

hapiSeneca.register.attributes = {
  name: 'hapi-seneca',
  version: '1.0.0'
};

module.exports = hapiSeneca;
