describe('statistic cards', () => {
  const apiUrl = Cypress.env('apiUrl');
  beforeEach(()=>{
    cy
      .authenticateUser()
      .visit('/')
  });


  it('makes an API call to fetch the statistics', () => {
    cy
      .request(`${apiUrl}/api/v1/automations/stats`)
      .then((response) => {
        expect(response.status).to.equal(200);
      })
  });

  it('stat containers should be 6', () => {
    cy
      .get('.stat-container')
      .should('be.visible')
      .should('have.length', 6)
  });
});
