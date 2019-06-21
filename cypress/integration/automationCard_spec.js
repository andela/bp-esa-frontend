describe('Automation Card', () => {
  beforeEach(() => {
    cy.authenticateUser();
  });


  it('should ensure the homepage loads properly', () => {
    cy.visit('/');
    cy.url().should('include', 'http://localhost:3000/');
  });

  it('should ensure that cards are the default view when page loads', () => {
    cy.get('.cont');
    cy.get('.card').should('have.class', 'card');
  });

  it('should ensure that the card contains a profile section', () => {
    cy.get('.cont')
      .get('.card')
      .get('.developerPicture').should('have.class', 'developerPicture');
  });

  it('sould show a tooltip when onboarding icon is hovered over', () => {
    cy.get('.cont')
      .get('.card')
      .get('#onboarding-info-icon')
      .trigger('mouseover')
      .get('.tooltiptext')
      .should('exist');
  });

  it('sould show a tooltip when offboarding icon is hovered over', () => {
    cy.get('.cont')
      .get('.card')
      .get('#offboarding-info-icon')
      .trigger('mouseover')
      .get('.tooltiptext')
      .should('exist');
  });

  it('sould show a tooltip when more information icon hovered over', () => {
    cy.get('.cont')
      .get('.card')
      .get('#more-info-icon')
      .trigger('mouseover')
      .get('.tooltiptext')
      .should('exist');
  });

  it('sould show a tooltip when AIS link icon hovered over', () => {
    cy.get('.cont')
      .get('.card')
      .get('#more-info-icon')
      .click({force: true})
      .get('#ais-link-icon')
      .trigger('mouseover')
      .get('.tooltiptext')
      .should('exist');
  });

  it('should contain automation status for success/total', ()=>{
    cy.get('.close')
      .click({force: true})
      .get(':nth-child(1) > .status-container > :nth-child(2) > span')
      .contains('0/0');
  });

  it('should render list view when list icon is clicked', () => {
    cy.get('#list-icon').click();
    cy.get('table')
      .find('tbody').should('be.visible');
  });

  it('should redirect to AIS profile when fellow name is clicked', () => {
    cy.get('table')
    cy.get('tr:nth-of-type(9)').click()
      .find('td:nth-of-type(3)').click()
      .should('have.class', 'fellow');
  });
});
