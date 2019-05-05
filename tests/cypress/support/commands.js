
// reset database to dump w/ fixtures in it
Cypress.Commands.add("resetDatabase", () => {
  cy.exec('mongo mongodb://localhost:3001/meteor --eval "db.dropDatabase()"'),
  cy.exec("mongorestore --port 3001 ./tests/cypress/fixtures/test_db");
});

// login w/ fixture user
// NOTE: window object must be loaded (page visited)
Cypress.Commands.add("login", () => {
  cy.window()
  .then(win => win.Meteor)
  .then(Meteor => Meteor.loginWithPassword('t@t.com', 'password'))
})


before(() => {
  cy.resetDatabase()
});
