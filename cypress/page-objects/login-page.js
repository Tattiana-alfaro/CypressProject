/// <reference types="Cypress" />

class LoginPage {
    url = '/signin';
    elements = {
      getUsername: () => cy.get('#username'),
      getPassword: () => cy.get('#password'),
      getSignInButton: () => cy.get('[data-test="signin-submit"]'),
    };
  
    visit() {
      cy.visit(this.url);
    }
  
    typeCredentials({ username = ' ', password = ' ' } = {}) {
      this.elements.getUsername().clear().type(username);
      this.elements.getPassword().clear().type(password);
    }
  
    clickSignIn() {
      this.elements.getSignInButton().click();
    }
  }
  
  export const loginPage = new LoginPage();