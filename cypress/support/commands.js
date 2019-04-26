const userState = Cypress.env('state');

Cypress.Commands.add('authenticateUser', (state = userState) => {
  window.localStorage.setItem('state', JSON.stringify(state));
});
