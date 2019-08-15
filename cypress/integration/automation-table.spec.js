describe('Automation Table', () => {
  beforeEach(() => {
    cy
      .authenticateUser()
      .visit('http://localhost:3000/?view=listView')
      .get('#list-icon')
      .click();
  });

  it('shows the table header', () => {
    cy
      .get('.report-table-header')
      .get('tr>th')
      .should('have.length', 9);
  });

  it('shows the info icon for each table row', () => {
    cy
      .get('.report-table')
      .get('#info-icon')
      .should('be.visible');
  });

  it('shows the headings in the table header', () => {
    cy
      .get('.report-table-header')
      .get('tr>th')
      .contains('Date');
    cy
      .get('.report-table-header')
      .get('tr>th')
      .contains('Engineer Name');
    cy
      .get('.report-table-header')
      .get('tr>th')
      .contains('Partner Name');
    cy
      .get('.report-table-header')
      .get('tr>th')
      .contains('Type');
    cy
      .get('.report-table-header')
      .get('tr>th')
      .contains('Email');
    cy
      .get('.report-table-header')
      .get('tr>th')
      .contains('Noko');
    cy
      .get('.report-table-header')
      .get('tr>th')
      .contains('Slack');
  });

  it('sould show a tooltip when fellow name is hovered over in table view', () => {
    cy.get('#fellow-name')
      .trigger('mouseover')
      .get('.tooltip-icon-black')
      .should('exist');
  });
});
