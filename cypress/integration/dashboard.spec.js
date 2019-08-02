describe('pill navigation', () => {
  beforeEach(() => {
    cy.authenticateUser();
  });

  it('should display dashboard', () => {
    cy.visit('/')
      .get('.nav-links:first')
      .click()
      .url()
      .should('include', '/dashboard')
      .get('.upSelling')
      .should('be.visible')
      .get('.upSelling > .title')
      .contains('Upselling Partners')
      .get(':nth-child(1) > .progress > .filler')
      .should('be.visible')
      .get(':nth-child(1) > .developers')
      .should('be.visible')
      .get(':nth-child(1) > .partner-name')
      .should('be.visible');
  });
});
