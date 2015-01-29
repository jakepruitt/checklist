/******************************************************
 * hapi-to-express
 * ---------------
 *
 * This module returns a function that creates
 * mocked Express request and response objects
 * that internally call the Hapi objects passed
 * to the function.
 *
 * @params
 *      request: a Hapi request object, ideally
 *               within a 'onPostAuth' server
 *               extension point so that 
 *               `request.payload` can be read
 *               and written to.
 *      reply:   a Hapi reply object, also hopefully
 *               in the 'onPostAuth' extension point.
 * @returns
 *      { res: ..., req: ... } - an object where `res`
 *      represents an Express response object and `req`
 *      represents an Express request object. Very limited
 *      API at the moment
 *
 * Notes: currently supporting a limited API based on
 *      Hapi 8.* and Express 4.* APIs
 ******************************************************/
var hapiToExpress = function hapiToExpress(request, reply) {
  var res, req, headers = {}, status = 200;

  req = request.raw.req;
  req.body = request.payload;
  req.query = request.query;

  res = {
    getHeader: function(headerName) {
      return headers[headerName];
    },

    setHeader: function(headerName, headerValue) {
      headers[headerName] = headerValue;
    },

    writeHead: function(resStatus, resHeader) {
      for (var header in resHeader) {
        if (resHeader.hasOwnProperty(header)) {
          headers[header] = resHeader[header];
        }
      }
      status = resStatus;
    },

    end: function(obstr) {
      var res = reply(obstr)

      res.code(status);
      for (header in headers) {
        if (headers.hasOwnProperty(header)) {
          res.header(header, headers[header]);
        }
      }
    }
  };

  return {
    res: res,
    req: req
  };
};

module.exports = hapiToExpress;
