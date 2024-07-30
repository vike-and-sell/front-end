describe('User can view an individual listing', () => {

    beforeEach(()=>{
      cy.viewport('macbook-13')
      cy.visit('/login')
      cy.get('[data-cy="username-input"]').type('john_doe')
      cy.get('[data-cy="password-input"]').type('Password123!')
      cy.get('[data-cy="signin-button"]').click()
      cy.url().should('not.include', '/login')
      cy.wait(1000)
    })
  
    it('User should be able to view an individual listing', () => {
      cy.visit('/browse/1')
      cy.url().should('include', '/browse/1')
      cy.get(".listing-card").first().click();
      cy.url().should('include', '/listing')
    })

  })