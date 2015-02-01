var LoginPage = function LoginPage() {
  this.header = $('.js-header');
  this.usernameInput = element(by.model('login.username'));
  this.passwordInput = element(by.model('login.password'));
  this.loginButton = $('input[type=submit]');
  this.errorStatement = $('.js-error');

  this.get = function() {
    browser.get('/#/login');
  };

  this.login = function(username, password) {
    this.usernameInput.sendKeys(username);
    this.passwordInput.sendKeys(password);

    return this.loginButton.click();
  };
};

module.exports = LoginPage;
