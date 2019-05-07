Cypress.on('window:before:load', (win) => {
  win.open = cy.stub().as('windowOpen');
});
const state = Cypress.env('state');

describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('loads Andela Logo', () => {
    cy
      .get('.logo')
      .should('be.visible');
  });

  it('should render button for sign in', () => {
    cy
      .get('button')
      .should('have.class', 'sign-in-button-container')
      .should('be.visible');
  });

  it('opens a window to enable login with google when sign in button is clicked', () => {
    cy
      .get('button')
      .click({ multiple: true })
      .get('@windowOpen')
      .should('be.called');
  });

  it('lands to home page if login is successful', () => {
    cy.server();
    cy.route({
      method: 'GET',
      url: 'http://localhost:6050',
      response: [],
    });
    window.localStorage.setItem('state', JSON.stringify(state));
    cy
      .visit('/')
      .get('.stats-wrapper')
      .should('be.visible');
  });
});
