describe('login functionality', function() {
  it('should show the login page when root is accessed', function() {
    browser.get('/');

    expect(element.all(by.id('login')).count()).toBe(1);
  });
});
