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

  it('lands to home page if login is successful', () => {
    cy.server();
    cy.route({
      method: 'GET',
      url: 'http://localhost:6050',
      response: [],
    });
    window.localStorage.setItem('state', JSON.stringify(state));
    cy.setCookie('jwt-token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJVc2VySW5mbyI6eyJpZCI6Ii10aGVJZCIsImZpcnN0X25hbWUiOiJKYW5lIiwibGFzdF9uYW1lIjoiRG9lIiwiZmlyc3ROYW1lIjoiSmFuZSIsImxhc3ROYW1lIjoiRG9lIiwiZW1haWwiOiJqYW5lLmRvZUBhbmRlbGEuY29tIiwibmFtZSI6IkphbmUgRG9lIiwicGljdHVyZSI6InRoZVBob3RvIiwicm9sZXMiOnsiRmVsbG93IjoiLWZlbGxvd1JvbGUiLCJBbmRlbGFuIjoiLWFuZGVsYW5Sb2xlIn19LCJpYXQiOjE1NjMxMzc1NjksImV4cCI6MTQ3NjIwMTY4NSwiYXVkIjoiYW5kZWxhLmNvbSIsImlzcyI6ImFjY291bnRzLmFuZGVsYS5jb20ifQ.u2OcvFKgrCKuYECVs7p2XoGLq6wY-7mEFpW26psgnoA');
    cy
      .visit('/')
      .get('.stats-wrapper')
      .should('be.visible');
  });
});
