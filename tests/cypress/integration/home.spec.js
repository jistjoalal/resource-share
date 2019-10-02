const { baseUrl } = Cypress.config();

describe("Home page", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("should render title link", () => {
    assertLink("Resource Share", "/");
  });
  ["Math" /*, "ELA" */].forEach(subject => {
    it(`should render ${subject} link`, () => {
      assertLink(subject, "/cc/" + subject);
    });
  });
});

const assertLink = (text, to) => {
  cy.get("body")
    .contains(text)
    .click();
  cy.url().should("eq", baseUrl + to);
};
