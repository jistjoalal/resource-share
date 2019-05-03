describe('Signup / Login', () => {
  before(() => {
    cy.resetDatabase();
    cy.visit('http://localhost:3000/signup');
  });

  it('should signup a new user', () => {
    // submit signup form
    cy.get('input[name="email"]').type(
      'test-user@example.com',
    );
    cy.get('input[name="password"]').type('password');
    cy.get('input[name="cPassword"]').type('password');
    cy.contains('Register').click();
    // should redirect to home page
    cy.url().should('eq', 'http://localhost:3000/');

    // user exists and is now logged in
    cy.window().then(win => {
      // this allows accessing the window object within the browser
      const user = win.Meteor.user();
      expect(user).to.exist;
      expect(user.emails[0].address).to.equal(
        'test-user@example.com',
      );
    });
  });

  it('should logout + login the new user', () => {
    cy.contains('Logout').click();
    cy.contains('Login').click();
    cy.url().should('eq', 'http://localhost:3000/login');
    // submit login form
    cy.get('input[name="email"]').type(
      'test-user@example.com',
    );
    cy.get('input[name="password"]').type('password');
    cy.get('form > div > button').contains('Login').click();
    // should redirect to home page
    cy.url().should('eq', 'http://localhost:3000/');

    // user exists and is now logged in
    cy.window().then(win => {
      // this allows accessing the window object within the browser
      const user = win.Meteor.user();
      expect(user).to.exist;
      expect(user.emails[0].address).to.equal(
        'test-user@example.com',
      );
    });
  })
});
