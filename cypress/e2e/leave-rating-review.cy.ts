describe('User can leave a rating and review', () => {

    beforeEach(()=>{
      cy.viewport('macbook-13')
      cy.visit('/login')
      cy.get('[data-cy="username-input"]').type('john_doe')
      cy.get('[data-cy="password-input"]').type('Password123!')
      cy.get('[data-cy="signin-button"]').click()
      cy.url().should('not.include', '/login')
      cy.wait(1000)
    })
  
    it('User should be able to leave a rating and review', () => {
      cy.visit('/listing/90')
      cy.get(".review-textbox").click().type("demo review here");
      cy.get(".star4").click();
      cy.get("[data-cy='submit-review']").click();
      cy.get("[data-status='success']");
    })

    it('User tries to submit without adding any values', () => {
        cy.visit('/listing/90')
        cy.get("[data-cy='submit-review']").click();
        cy.wait(1000)
        cy.get("[data-cy='review-textbox-error']").should('exist').and('be.visible')
        cy.get("[data-cy='rating-error']").should('exist').and('be.visible')
      })

   

  })