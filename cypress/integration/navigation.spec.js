describe('pill navigation', () => {
  beforeEach(() => {
    const data = {
      fixture: 'statistics.json',
      method: 'GET',
      route: '/api/v1/automations/stats',
    };
    const onBoarding = {
      fixture: 'automations/automationsOnboarding.json',
      method: 'GET',
      route: 'api/v1/automations?*',
    };
    cy.authenticateUser();
    cy.setApi(data);
    cy.setApi(onBoarding);
  });
  it('finds pills on the navigation bar and sets automations as active pill', () => {
    cy.visit('/')
      .get('.nav-links')
      .should('have.length', 2);
    cy.get('.nav-links.active')
      .contains('Automations');
  });

  it('redirects to the dashboard when dashboard pill is clicked', () => {
    cy.visit('/')
      .get('.nav-links:first')
      .click()
      .url()
      .should('include', '/dashboard');
  });
});
