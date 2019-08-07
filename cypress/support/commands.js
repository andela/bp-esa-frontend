import cypressGetReactComponent from 'cypress-get-react-component';
/* eslint-disable no-undef */
const userState = Cypress.env('state');
const apiUrl = Cypress.env('apiUrl');

cypressGetReactComponent.install();

Cypress.Commands.add('authenticateUser', (state = userState) => {
  window.localStorage.setItem('state', JSON.stringify(state));
  cy.setCookie('jwt-token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJVc2VySW5mbyI6eyJpZCI6Ii10aGVJZCIsImZpcnN0X25hbWUiOiJKYW5lIiwibGFzdF9uYW1lIjoiRG9lIiwiZmlyc3ROYW1lIjoiSmFuZSIsImxhc3ROYW1lIjoiRG9lIiwiZW1haWwiOiJqYW5lLmRvZUBhbmRlbGEuY29tIiwibmFtZSI6IkphbmUgRG9lIiwicGljdHVyZSI6InRoZVBob3RvIiwicm9sZXMiOnsiRmVsbG93IjoiLWZlbGxvd1JvbGUiLCJBbmRlbGFuIjoiLWFuZGVsYW5Sb2xlIn19LCJpYXQiOjE1NjMxMzc1NjksImV4cCI6MTQ3NjIwMTY4NSwiYXVkIjoiYW5kZWxhLmNvbSIsImlzcyI6ImFjY291bnRzLmFuZGVsYS5jb20ifQ.u2OcvFKgrCKuYECVs7p2XoGLq6wY-7mEFpW26psgnoA');
});

Cypress.Commands.add('setApi', ({ fixture, method, route }) => {
  cy.fixture(fixture)
    .then((response) => {
      cy.server();
      cy.route({
        method, url: `${apiUrl}${route}`, response,
      });
    });
});
