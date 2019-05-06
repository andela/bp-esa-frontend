describe('statistic cards', () => {
  beforeEach(() => {
    const data = {
      fixture: 'statistics.json',
      method: 'GET',
      route: '/automations/stats',
    };
    cy.setApi(data)
      .authenticateUser();
  });

  it('stat containers should be 6', () => {
    cy.visit('/')
      .get('.stat-container')
      .should('be.visible')
      .should('have.length', 6);
  });

  it('calculates stats percentage effectively', () => {
    cy.visit('/')
      .wait(6000)
      .get('.stat-container:last')
      .contains('13%')
      .get('.stat-container:first')
      .contains('0%')
      .get('.stat-container:nth-child(2)')
      .contains('50%')
      .get('.stat-container:nth-child(3)')
      .contains('17%')
      .get('.stat-container:nth-child(5)')
      .contains('13%');
  });
});
