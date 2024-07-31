describe('User should be able to request an emailed link to reset their password', () => {

    beforeEach(()=>{
        cy.viewport('macbook-13')
        cy.visit('https://localhost:5173/login')
        cy.get('[data-cy="recover-pass-button"]').should('be.visible').click()
    })

    it('User can request a link be emailed to them using a valid email',() => {
        cy.get('[data-cy="email-input"]').type('janedoe')
        cy.get('[data-cy="send-email-button"]').click()
        cy.get("[data-status='success']");
    })

    it('User can not request an emailed link using an email that is not already registered', () => {
        cy.get('[data-cy="email-input"]').type('janedoe@')
        cy.get('[data-cy="form-error-msg"]').should('be.visible')
        cy.get('[data-cy="send-email-button"]').click()
        cy.get('[data-cy="error-msg"]').should('be.visible')
    })

    it('User can cancel reset and return to login page', () => {
        cy.get('[data-cy="cancel-button"]').should('be.visible').click()
        cy.get('[data-cy="recover-pass-button"]').should('be.visible')
    })
})

describe('User should be able to reset their password', () => {
    beforeEach(()=>{
        cy.viewport('macbook-13')
        cy.visit('https://localhost:5173/unverified/reset/:jwt')
    })

    it('User can reset with valid matching password',() => {
        cy.get('[data-cy="new-pass-input"]').type('NewPass123!')
        cy.get('[data-cy="confirm-pass-input"]').type('NewPass123!')
        cy.get('[data-cy="reset-pass-button"]').click()
    })

    it('User can not reset if valid password does not match confirm password',() => {
        cy.get('[data-cy="new-pass-input"]').type('NewPass123!')
        cy.get('[data-cy="confirm-pass-input"]').type('NewPass123$')
        cy.get('[data-cy="reset-pass-button"]').click()
        cy.get("[data-cy='reset-error-msg']").should('be.visible');
    })

    it('User can not reset if new password is invalid',() => {
        cy.get('[data-cy="new-pass-input"]').type('New')
        cy.get('[data-cy="reset-pass-button"]').click()
        cy.get("[data-cy='reset-error-msg']").should('be.visible');
    })
})