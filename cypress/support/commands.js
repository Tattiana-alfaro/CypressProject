// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
const authState = require('./auth-state.json')

Cypress.Commands.add('apiLogin', (username, password) => {
  const type = 'LOGIN';
  cy.request({
    method: 'POST',
    url: `${Cypress.env('requestBaseUrl')}/login`,
    body: { username, password, type }
  }).then((response) => {
    authState.context.user = response.body.user
    authState._event.data.data.user = response.body.user
    authState.event.data.user = response.body.user
    window.localStorage.setItem('authState', JSON.stringify(authState))
  })
})