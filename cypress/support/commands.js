import cypressGetReactComponent from 'cypress-get-react-component';
/* eslint-disable no-undef */
const userState = Cypress.env('state');
const apiUrl = Cypress.env('apiUrl');

cypressGetReactComponent.install();

Cypress.Commands.add('authenticateUser', (state = userState) => {
  window.localStorage.setItem('state', JSON.stringify(state));
  cy.setCookie('jwt-token', Cypress.env('jwtToken'));
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
