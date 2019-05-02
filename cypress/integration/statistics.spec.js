describe('statistic cards', () => {
  const apiUrl = Cypress.env('apiUrl');
  beforeEach(()=> {
    cy
      .authenticateUser()
      .visit('/');
  });

  it('makes an API call to fetch the statistics', () => {
    cy
      .server()
      .route({
        method: 'GET',
        url: '/api/v1/automations/stats',
        status: 200,
        response: 'fixture:stats.json',
      });

    cy
      .get('.stats-wrapper')
      .should('be.visible');
  });

  it('stat containers should be 6', () => {
    cy
      .get('.stat-container')
      .should('be.visible')
      .should('have.length', 6);
  });
});
