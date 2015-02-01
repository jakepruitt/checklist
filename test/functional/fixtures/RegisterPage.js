var RegisterPage = function() {
  this.header = $('js-header');
  this.usernameInput = element(by.model('register.username'));
  this.passwordInput = element(by.model('register.password'));
  this.registerButton = $('input[type=submit]');
  this.errorStatement = $('.js-error');

  this.get = function() {
    browser.get('/#/register');
  };

  this.register = function(username, password) {
    this.usernameInput.sendKeys(username);
    this.passwordInput.sendKeys(password);

    return this.registerButton.click();
  };
};

module.exports = RegisterPage;
