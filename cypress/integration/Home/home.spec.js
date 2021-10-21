/// <reference types="Cypress" />


describe('Home Tests', () => {
    // Hooks
    beforeEach(() => {
        cy.intercept('GET', '/').as('home'); //loginPOST is the alias of the request.
        cy.apiLogin(Cypress.env('testUser'), Cypress.env('testPassword'));
        cy.visit('/');
        cy.wait('@home');
    });

    context('Positive Scenarios', () => {

        it('should list transations', () => {
            cy.get('[data-test^="transaction-item"]').should('have.length.above', 0);
        });
            
        it('should add comments in transactions', () => {
            cy.get('[data-test="transaction-like-count"]').first().click({ force: true });
            cy.get('[data-test^="transaction-comment-input"]').should('be.visible').type("Test comment{enter}");
            cy.get('[data-test^="comment-list-item"]').filter(':contains("Test comment")').first().should('be.visible');
        })

        it('should give a like in the transaction', () => {
            cy.get('[data-test="transaction-like-count"]').first().click({ force: true });
            cy.get('[data-test^="transaction-like-button"]').click();
            cy.get('[data-test^="transaction-like-count"]').should('not.contain.text', "0");
        })
    });
});