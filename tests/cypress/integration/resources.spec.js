import "cypress-file-upload";

describe("Add/Remove Resources", () => {

  const resourceTitle = "A test resource";
  const testFileBody = "a test file!";

  beforeEach(() => {
    cy.visit("/cc/Math");
    cy.login();
    // open form and title post
    cy.get("body")
      .contains("Submit new Resource")
      .click();
    cy.get(".Modal__close");
    cy.get('input[name="title"]').type(resourceTitle);
  })

  it("should submit/fav/delete new Link resource", () => {
    // link should be active by default
    cy.get("button")
      .contains("Link")
      .should("have.class", "active");
    cy.get('input[name="url"]').type("http://example.com");
    cy.get("form").submit();
    // should redirect to comments page for new resource
    cy.url().should("contain", "/comments/");
    // should alert user that post was created
    cy.get("body").contains("Post Created!");

    // should favorite post
    cy.get('[data-cy=favorite]').click()
    cy.get('[data-cy=favorite]').should('have.class', 'text-danger')
    // should show up on favorites page
    cy.contains('My Favorites').click()
    cy.url().should("contain", '/favorites/')

    // go back to comments page
    cy.go('back')
    cy.url().should("contain", '/comments/')

    // should delete new resource
    cy.get('.DeleteResource').click()
    cy.get('body').contains('Resource Not Found')
  });

  it("should submit/delete new File resource", () => {
    // select file upload
    cy.get("button")
      .contains("File")
      .click();
    // mock file
    const fileName = "testFile.txt";
    cy.fixture(fileName).then(fileContent => {
      cy.get('input[type="file"]').upload(
        { fileContent, fileName, mimeType: "text/plain" },
        { subjectType: "input" }
      );
    });
    cy.get("form").submit();
    // should momentarily show loading icon
    cy.get(".LoadingIcon");
    // should redirect to comments page for new resource
    cy.url().should("contain", "/comments/");
    // should alert user that post was created
    cy.get("body").contains("Post Created!");

    // grab s3 url from page
    cy.get('body').contains(resourceTitle)
      .then($e => $e[0].href)
      .then(url => {
        // resource should be uploaded to s3
        cy.request(url).its('body').should('include', testFileBody)
        // should delete new resource
        cy.get('.DeleteResource').click()
        cy.get('body').contains('Resource Not Found')
        // resource should be removed from s3
        requestUntil403(url)
      })
  });
});

const requestUntil403 = (url, tries=0) => {
  cy.request({
    url,
    failOnStatusCode: false,
  }).then(resp => {
    if (tries > 10)
      throw new Error('s3 deletion timed out')
    if (resp.status === 403)
      return resp
    cy.wait(1000)
    requestUntil403(url, tries + 1)
  })
}
