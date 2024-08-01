describe('User should be able to request an emailed link to register', () => {

    beforeEach(()=>{
        cy.viewport('macbook-13')
        cy.visit('https://localhost:5173/login')
        cy.get('[data-cy="username-input"]').type('john_doe')
        cy.get('[data-cy="password-input"]').type('Password123!')
        cy.get('[data-cy="signin-button"]').should('be.visible').click();
        // Wait for navigation to complete
        cy.url().should('not.include', '/login')
        cy.wait(1000)
    })

    it('User should be able to change their location when entering a valid postal code', () => {
        cy.visit('/settings')
        cy.get('h1').contains('Settings');
        cy.get('[data-cy="change-location-menu-button"]').click();
        cy.get('[data-cy="location-input"]').should('be.visible').type('V6R 4T2');
        cy.get('[data-cy="confirm-new-location-button"]').should('be.visible').click();
        cy.get('[data-cy="current-location"]').should(
            "have.text",
            "V6R"
          );
    })

    it('User should not be able to change their location when entering an invalid postal code', () => {
        cy.visit('/settings')
        cy.get('h1').contains('Settings');
        cy.get('[data-cy="change-location-menu-button"]').should('be.visible').click();
        cy.get('[data-cy="location-input"]').should('be.visible').type('V6');
        cy.get('[data-cy="confirm-new-location-button"]').should('be.disabled');
    })

    it('User should be able to see a link for the reset password process', () => {
        cy.visit('/settings')
        cy.get('h1').contains('Settings');
        cy.get('[data-cy="change-password-menu-button"]').click();
        cy.get('[data-cy="reset-link"]').should('be.visible');
    })
})