var RegisterPage = require('./fixtures/RegisterPage');

describe('registration page', function() {
  var register = new RegisterPage();

  it('should go to the right page', function() {
    register.get();
    expect(register.header.getText()).toMatch(/register/i);
  });

  it('should go to the homepage on a successful signup', function(done) {
    register.get();

    register.register('a2', 'a2').then(function() {
      expect(browser.getLocationAbsUrl()).toBe('/');
      done();
    });
  });
});
