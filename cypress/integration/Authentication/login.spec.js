/// <reference types="Cypress" />

describe('Login Tests', () => {
    // Hooks
    beforeEach(() => {
      // Intercept the request to the API
      cy.intercept('POST', '/login').as('loginPOST'); //loginPOST is the alias of the request.
      cy.visit('/signin');
    });
  
    context('Positive Scenarios', () => {
      it('should log in', () => {
        cy.get('#username').type(Cypress.env('testUser'));
        cy.get('#password').type(Cypress.env('testPassword'));
        cy.get('[data-test="signin-submit"]').click();
        cy.wait('@loginPOST');
        cy.url().should('include', '/');
        cy.contains(Cypress.env('testUser')).should('be.visible');
      });
    });
  
    context('Negative Scenarios', () => {
      it('should not log in', () => {
        cy.get('#username').type('margaretta');
        cy.get('#password').type('margaretta');
        cy.get('[data-test="signin-submit"]').click();
        cy.wait('@loginPOST');
        cy.url().should('include', '/signin');
        cy.contains('Username or password is invalid').should('be.visible');
      });
    });
  });