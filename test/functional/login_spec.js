console.log(require);
var LoginPage = require('./fixtures/LoginPage');
console.log(LoginPage);

describe('login functionality', function() {
  var login = new LoginPage();

  it('should show the login page when root is accessed for the first time', function() {
    browser.get('/');
    expect(browser.getLocationAbsUrl()).toBe('/login');
    expect(login.header.getText()).toMatch(/login/i);
  });

  it('should log the user in with the predefined username and password', function(done) {
    login.get();

    login.login('a1', 'a1').then(function() {
      expect(browser.getLocationAbsUrl()).toBe('/');
      done();
    });
  });

  it('should show an error when an incorrect username is used', function(done) {
    login.get();

    login.login('b1', 'b1').then(function() {
      expect(browser.getLocationAbsUrl()).toBe('/login');
      expect(login.errorStatement.getText()).toMatch(/error/i);
      done();
    });
  });

  it('should show an error when wrong password is used', function(done) {
    login.get();

    login.login('a1', 'b1').then(function() {
      expect(browser.getLocationAbsUrl()).toBe('/login');
      expect(login.errorStatement.getText()).toMatch(/error/i);
      done();
    });
  });

  it('should allow users to refresh page and stay logged in', function(done) {
    login.get();

    login.login('a1', 'a1').then(function() {
      return browser.refresh();
    }).then(function() {
      expect(browser.getLocationAbsUrl()).toBe('/');
      done();
    });
  });

  it('should not allow users to go to the login page after logging in', function(done) {
    login.get();

    login.login('a1', 'a1').then(function() {
      return browser.get('/#/login');
    }).then(function() {
      expect(browser.getLocationAbsUrl()).toBe('/');
      done();
    });
  });
});
