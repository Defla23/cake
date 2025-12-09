/// <reference types="cypress" />

Cypress.Commands.add('getDataTest', (dataTestSelector) => {
    return cy.get(`[data-test="${dataTestSelector}"]`)
})
Cypress.Commands.add('loginAsAdmin', (email = 'testsample12@gmail.com', password = 'mypass123') => {
    cy.visit('/login')
    cy.getDataTest('login-email-input').type(email)
    cy.getDataTest('login-password-input').type(password)
    cy.getDataTest('login-submit-button').click()
    cy.url().should('include', '/admin/dashboard/analytics').as('adminDashboardUrl').as('adminDashboardUrl')
})

export { }
declare global {
  namespace Cypress {
    interface Chainable {
         getDataTest(value: string): Chainable<JQuery<HTMLElement>>;
         loginAsAdmin(email: string, password: string): Chainable<void>;

    }
  }
}