describe('User can create a listing', () => {

    beforeEach(()=>{
        cy.viewport('macbook-13')
        cy.visit('https://localhost:5173/login')
    })

    it('User can succesfully login with the right username and password', () => {
    
        cy.get('[data-cy="username-input"]').type('john_doe')
        cy.get('[data-cy="password-input"]').type('Password123!')
        cy.get('[data-cy="signin-button"]').should('be.visible').click();
        // Wait for navigation to complete
        cy.url().should('not.include', '/login')
        cy.wait(1000)
    })

    it('User can not login with the wrong username and right password', () => {
    
        cy.get('[data-cy="username-input"]').type('john_dwdwwoe')
        cy.get('[data-cy="password-input"]').type('Password123!')
        cy.get('[data-cy="signin-button"]').should('be.visible').click();
        cy.wait(1000)
        cy.get('[data-cy="login-error"]').should('be.visible');
        
    })

    it('User can not login with the right username and wrong password', () => {
    
        cy.get('[data-cy="username-input"]').type('john_dwdwwoe')
        cy.get('[data-cy="password-input"]').type('Passwfwvwlkndwkoord123!')
        cy.get('[data-cy="signin-button"]').should('be.visible').click();
        cy.wait(1000)
        cy.get('[data-cy="login-error"]').should('be.visible');
        
    })


})