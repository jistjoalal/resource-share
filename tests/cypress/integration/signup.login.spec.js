const { baseUrl } = Cypress.config()

describe("Signup / Login", () => {
  it("should signup a new user", () => {
    // visit signup page
    cy.visit("/signup");
    // submit signup form
    cy.get('input[name="email"]').type("test-user@example.com");
    cy.get('input[name="password"]').type("password");
    cy.get('input[name="cPassword"]').type("password");
    cy.get("form").submit();
    // redirect to home page
    cy.url().should("eq", baseUrl + "/"); 
    // user exists and is now logged in
    userExistsAndLoggedIn();
  });

  it("should logout + login the new user", () => {
    // logout
    cy.contains("Logout").click();
    // login
    cy.contains("Login").click();
    cy.url().should("eq", baseUrl + "/login");
    // submit login form
    cy.get('input[name="email"]').type("test-user@example.com");
    cy.get('input[name="password"]').type("password");
    cy.get("form").submit();
    // should redirect to home page
    cy.url().should("eq", baseUrl + "/"); 
    // user exists and is now logged in
    userExistsAndLoggedIn();
  });
});

const userExistsAndLoggedIn = () => {
  // user exists and is now logged in
  cy.window().then(win => {
    // this allows accessing the window object within the browser
    const user = win.Meteor.user();
    expect(user).to.exist;
    expect(user.emails[0].address).to.equal("test-user@example.com");
  });
};
