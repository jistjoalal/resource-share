const { baseUrl } = Cypress.config();

describe("Signup / Login", () => {
  it("should signup a new user", () => {
    // logout user before attempting signup
    cy.clearCookies();
    // visit signup page
    cy.visit("/signup");
    // submit signup form
    cy.get('input[name="email"]').type("test@t.com");
    cy.get('input[name="password"]').type("password");
    cy.get('input[name="cPassword"]').type("password");
    cy.get("form").submit();
    // redirect to home page
    cy.url().should("eq", baseUrl + "/");
    // user exists and is now logged in
    userExistsAndLoggedIn("test@t.com");
  });

  it("should logout + login the new user", () => {
    cy.contains("Logout").click();
    // login w/ fixture user (t@t.com)
    cy.visit("/login");
    cy.get('input[name="email"]').type("t@t.com");
    cy.get('input[name="password"]').type("password");
    cy.get("form").submit();
    // should redirect to home page
    cy.url().should("eq", baseUrl + "/");
    // user exists and is now logged in
    userExistsAndLoggedIn("t@t.com");
  });
});

const userExistsAndLoggedIn = email => {
  // user exists and is now logged in
  cy.window().then(win => {
    // this allows accessing the window object within the browser
    const user = win.Meteor.user();
    expect(user).to.exist;
    expect(user.emails[0].address).to.equal(email);
  });
};
