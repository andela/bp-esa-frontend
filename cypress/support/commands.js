const userState = Cypress.env('state');
const apiUrl = Cypress.env('apiUrl');

Cypress.Commands.add('authenticateUser', (state = userState) => {
  window.localStorage.setItem('state', JSON.stringify(state));
});

Cypress.Commands.add('setApi', ({ fixture, method, route }) => {
  cy.fixture(fixture)
    .then((response) => {
      cy.server();
      cy.route({
        method, url: `${apiUrl}${route}`, response
      })
    })
});
