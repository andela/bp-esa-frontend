describe('statistic cards', () => {
  beforeEach(() => {
    const data = {
      fixture: 'statistics.json',
      method: 'GET',
      route: '/api/v1/automations/stats/days',
    };
    cy.setApi(data)
      .authenticateUser()
      .visit('/');
  });

  it('stat containers should be 6', () => {
    cy.get('.stat-container')
      .should('be.visible')
      .should('have.length', 6);
  });

  it('calculates stats percentage effectively', () => {
    cy.wait(6000)
      .get('.stat-container:last')
      .contains('0%')
      .get('.stat-container:first')
      .contains('0%')
      .get('.stat-container:nth-child(2)')
      .contains('0%')
      .get('.stat-container:nth-child(3)')
      .contains('0%')
      .get('.stat-container:nth-child(5)')
      .contains('0%');
  });

  describe('stats dropdown', () => {
    beforeEach(() => {
      cy.get('.stat-dropdown-caret')
        .click({ force: true });
    });

    it('shows a dropdown when the stats dropdown caret is clicked', () => {
      cy.get('.stat-dropdown-content')
        .should('be.visible');
    });

    it('closes the dropdown when the stats dropdown caret is clicked with the dropdown already showing', () => {
      cy.get('.stat-dropdown-caret')
        .click({ force: true })
        .get('.stat-dropdown-content')
        .should('not.be.visible');
    });

    it('selects today as the timeframe when today is clicked in the dropdown', () => {
      cy.get('#days')
        .click()
        .get('.stat-dropdown-content')
        .should('not.be.visible')
        .get('.stat-dropdown-container')
        .contains('today');
    });

    it('selects this week as the timeframe when this week is clicked in the dropdown', () => {
      cy.get('#weeks')
        .click()
        .get('.stat-dropdown-content')
        .should('not.be.visible')
        .get('.stat-dropdown-container')
        .contains('this week');
    });

    it('selects this month as the timeframe when this month is clicked in the dropdown', () => {
      cy.get('#months')
        .click()
        .get('.stat-dropdown-content')
        .should('not.be.visible')
        .get('.stat-dropdown-container')
        .contains('this month');
    });

    it('selects this year as the timeframe when this year is clicked in the dropdown', () => {
      cy.get('#years')
        .click()
        .get('.stat-dropdown-content')
        .should('not.be.visible')
        .get('.stat-dropdown-container')
        .contains('this year');
    });
  });
});
