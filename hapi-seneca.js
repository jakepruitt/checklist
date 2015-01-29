/**********************************************
 * hapi-seneca
 * -----------
 *
 * This module returns a Hapi plugin that
 * allows seneca-web functionality to work
 * as expected in the Hapi framework.
 *
 * @params
 *      When used with framework, the options
 *      object should have the `seneca` option
 *      referencing the seneca instance that 
 *      any seneca-web actions have been called
 *      on.
 *      The `cors` option should be set to true
 *      if the API is to be accessed by other
 *      websites.
 *
 * @returns
 *      A Hapi plugin that can be registered
 *      to a hapi instance with:
 *      server.register({
 *        register: require('./hapi-seneca');
 *        options: {
 *          seneca: seneca,
 *          cors: true
 *        }
 *      }, cb);
 *
 * Note: most of the logic for this app
 *      lies in the 'hapi-to-express' module.
 *********************************************/

var hapiToExpress = require('./hapi-to-express');

var hapiSeneca = {
  register: function (server, options, next) {
    var seneca = options.seneca;

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
    
    server.ext('onPostAuth', function(request, reply) {
      var hapress = hapiToExpress(request, reply);

      seneca.export('web')(hapress.req, hapress.res, function(err) {
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
