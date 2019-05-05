import "cypress-file-upload";

describe("Add Resources", () => {
  beforeEach(() => {
    cy.visit("/cc/Math");
    cy.login();
    // open form and title post
    cy.get("body")
      .contains("Submit new Resource")
      .click();
    cy.get(".Modal__close");
    cy.get('input[name="title"]').type("A test resource");
  });

  afterEach(() => {
    // should redirect to comments page for new resource
    cy.url().should("contain", "/comments/");
    // should alert user that post was created
    cy.get("body").contains("Post Created!");
  });

  it("should submit new Link resource", () => {
    // link should be active by default
    cy.get("button")
      .contains("Link")
      .should("have.class", "active");
    cy.get('input[name="url"]').type("http://example.com");
    cy.get("form").submit();
  });

  it("should submit new File resource", () => {
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
  });
});
