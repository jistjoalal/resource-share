describe("Comments", () => {
  const testComment = "A test comment!";

  beforeEach(() => {
    cy.visit("/cc/Math/1");
    cy.login();
  });

  it("should insert/remove comment", () => {
    // visit a 1st grade fixture resource comments page
    cy.get("[data-cy=comments]:first").click();
    cy.url().should("contain", "/comments/");
    // leave a comment
    cy.get("textarea").type(testComment);
    cy.get("form").submit();
    // comment should be posted
    cy.get("p").contains(testComment);

    // should delete comment
    cy.get("[data-cy=deleteComment]").click();
    cy.get("[data-cy=commentList] > div > div")
      .children()
      .should("have.length", 0);
  });
});
