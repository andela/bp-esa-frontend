describe('Tabular card switch', () => {
  beforeEach(() => {
    cy
      .authenticateUser()
      .visit('/');
  });
  it('switches to card view', () => {
    cy
      .get('#card-icon')
      .click()
      .get('.card')
      .should('be.visible');
  });
  it('switches to tabular view', () => {
    cy
      .get('#list-icon')
      .click()
      .get('#info-icon')
      .should('be.visible');
  });
});
