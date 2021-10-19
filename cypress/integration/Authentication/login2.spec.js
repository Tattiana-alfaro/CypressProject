/// <reference types="Cypress" />

import { loginPage } from '../../page-objects/login-page';

describe('Login Tests', () => {
  context('Login through API', () => {
    beforeEach(() => {
      cy.apiLogin(Cypress.env('testUser'), Cypress.env('testPassword'));
    });

    it('should navigate to bank accounts', () => {
      cy.visit('/bankaccounts');
      cy.get('[data-test="bankaccount-new"]').and('be.visible').click();
    });
  });

  context('Login through UI', () => {
    // Hooks
    beforeEach(() => {
      // Intercept the request to the API
      cy.intercept('POST', '/login').as('login');
      loginPage.visit();
    });

    context('Positive Scenarios', () => {
      it('should log in - No POM', () => {
        cy.get('#username').type(Cypress.env('testUser'));
        cy.get('#password').type(Cypress.env('testPassword'));
        cy.get('[data-test="signin-submit"]').click();
        cy.wait('@login');
        cy.url().should('include', '/');
        cy.contains(Cypress.env('testUser')).should('be.visible');
      });

      it('should log in - POM', () => {
        loginPage.typeCredentials({
          username: Cypress.env('testUser'),
          password: Cypress.env('testPassword'),
        });
        loginPage.clickSignIn();
        cy.url().should('include', '/');
        cy.contains(Cypress.env('testUser')).should('be.visible');
      });
    });

    context('Negative Scenarios', () => {
      it('should not log in - POM - No credentials', () => {
        loginPage.typeCredentials();
        loginPage.elements.getSignInButton().should('not.be.enabled');
      });

      it('should not log in - POM - Only Username', () => {
        loginPage.typeCredentials({ username: Cypress.env('testUser') });
        loginPage.elements.getSignInButton().should('not.be.enabled');
      });

      it('should not log in - POM - Only Password', () => {
        loginPage.typeCredentials({ password: Cypress.env('testPassword') });
        loginPage.elements.getSignInButton().should('be.enabled');
        loginPage.clickSignIn();
        cy.url().should('include', loginPage.url);
      });

      it('should not log in - POM - Wrong Creds', () => {
        loginPage.typeCredentials({ username: 'wrongUsername', password: 'wrongPassword' });
        loginPage.elements.getSignInButton().should('be.enabled');
        loginPage.clickSignIn();
        cy.url().should('include', loginPage.url);
      });
    });
  });
});