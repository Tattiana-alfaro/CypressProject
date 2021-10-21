/// <reference types="Cypress" />

const uuid = () => Cypress._.random(0, 1e6);
const id = uuid();
const bankName = `BankName${id}`;
const routingNumber = `111${id}`;
const accountNumber = `2222${id}`;

describe('Bank Accounts Tests', () => {
    // Hooks
    before(() => {
        cy.intercept('GET', '/bankaccounts').as('bankaccounts'); //loginPOST is the alias of the request.
        cy.apiLogin(Cypress.env('testUser'), Cypress.env('testPassword'));
        cy.visit('/bankaccounts');
        cy.wait('@bankaccounts');
    });

    context('Positive Scenarios', () => {
        it('create new account', () => {
            cy.get('[data-test="bankaccount-new"]').click();
            cy.get('#bankaccount-bankName-input').type(bankName);       
            cy.get('#bankaccount-routingNumber-input').type(routingNumber);
            cy.get('[data-test="bankaccount-submit"]').should('be.disabled');       
            cy.get('#bankaccount-accountNumber-input').type(accountNumber);
            cy.get('[data-test="bankaccount-submit"]').should('not.be.disabled').click();
            cy.get('[data-test^="bankaccount-list-item"]').filter(':contains("BankName")').last().find('button').click().should('have.text', '');
            cy.get('[data-test^="bankaccount-list-item"]').filter(':contains("BankName")').last().find('p').should('have.text', 'Delete');


            });                    
        });
    });