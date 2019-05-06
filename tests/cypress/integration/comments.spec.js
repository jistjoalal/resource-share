describe.only('Comments', () => {

  const testComment = 'A test comment!';

  beforeEach(() => {
    cy.visit('/cc/Math/1')
    cy.login()
  })

  it('should insert comment', () => {
    // visit a 1st grade fixture resource comments page
    cy.get('[data-cy=comments]').click()
    cy.url().should('contain', '/comments/')
    // leave a comment
    cy.get('textarea').type(testComment)
    cy.get('form').submit()
    // comment should be posted
    cy.get('p').contains(testComment)
  })
})
