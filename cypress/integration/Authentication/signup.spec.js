/// <reference types="Cypress" />


describe('Login Tests', () => {
    // Hooks
    beforeEach(() => {
      // Intercept the request to the API
      cy.intercept('POST', '/login').as('login'); //loginPOST is the alias of the request.
      cy.visit('/signup');
    });
  
    context('Positive Scenarios', () => {
      it('should create user and login with the new user', () => {
        const uuid = () => Cypress._.random(0, 1e6);
        const id = uuid();
        const testUserName = `testUsername${id}`;
        const testPassword = `password${id}`;
        
        cy.get('#firstName').type('Cypress Test');
        cy.get('#lastName').type('User');
        cy.get('#username').type(testUserName);
        cy.get('#password').type(testPassword);

        cy.get('[data-test="signup-submit"]').should('be.disabled');//Validate that the button is disabled        
        cy.get('#confirmPassword').type(testPassword);
        cy.get('[data-test="signup-submit"]').should('not.be.disabled');//Validate that the button is not disabled        
        cy.get('[data-test="signup-submit"]').click();
        
        cy.get('#username').type(testUserName);
        cy.get('#password').type(testPassword);
        cy.get('[data-test="signin-submit"]').click();
        cy.wait('@login');
        cy.url().should('include', '/');
        cy.contains(testUserName).should('be.visible');
        //cy.contains(Cypress.env('testUser')).should('be.visible');
      });
    });
  
    context('Negative Scenarios', () => {
      it('should display Password does not match', () => {
        cy.get('#firstName').type('Cypress Test');
        cy.get('#lastName').type('User');
        cy.get('#username').type(testUserName);
        cy.get('#password').type(testPassword);   
        cy.get('#confirmPassword').type(testUserName); 
        cy.get('#confirmPassword-helper-text').should('contain', 'Password does not match');
      });
    });
  });