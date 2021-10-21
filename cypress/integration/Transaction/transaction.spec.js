/// <reference types="Cypress" />

describe('Transactions Tests', () => {
    // Hooks
    before(() => {
        cy.intercept('GET', '/users').as('users'); //loginPOST is the alias of the request.
        cy.apiLogin(Cypress.env('testUser'), Cypress.env('testPassword'));
        cy.visit('/`transaction/new');
        cy.wait('@users');
    });

    context('Positive Scenarios', () => {
        const amount = 100;

        it('should create new transaction - REQUEST', () => {
            
            cy.get('[data-test^="user-list-item"]').first().click();
            cy.get('[data-test="transaction-create-submit-request"]').should('be.disabled');
            cy.get('#amount').type(amount);
            cy.get('#transaction-create-description-input').type("Test reason");
            cy.get('[data-test="transaction-create-submit-request"]').should('not.be.disabled').click();
            cy.get('.MuiAlert-message').should('be.visible');
            
            });
            
        it('should create another transation - PAY', () => {
            cy.get('[data-test="new-transaction-create-another-transaction"]').click();
            cy.get('[data-test^="user-list-item"]').first().click();
            cy.get('[data-test="transaction-create-submit-payment"]').should('be.disabled');
            cy.get('#amount').type(amount);
            cy.get('#transaction-create-description-input').type("Test reason");
            cy.get('[data-test="transaction-create-submit-payment"]').should('not.be.disabled').click();
            cy.get('.MuiAlert-message').should('be.visible');
        })
    });
});