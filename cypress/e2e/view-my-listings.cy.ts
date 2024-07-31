describe('User can view my listings page', () => {

    beforeEach(()=>{
      cy.viewport('macbook-13')
      cy.visit('/login')
      cy.get('[data-cy="username-input"]').type('john_doe')
      cy.get('[data-cy="password-input"]').type('Password123!')
      cy.get('[data-cy="signin-button"]').click()
      cy.url().should('not.include', '/login')
      cy.wait(1000)
    })
  
    it('User should be able to their own listings page', () => {
      cy.visit('/mylistings/1')
      cy.get('h1').contains('My Listings');
      cy.get(".listing-card");
    })

    it('User should be able to access pagination in their listings page', () => {
        cy.visit('/mylistings/1')
        cy.get("[title='Next Page Button']").click();
        cy.url().should('include', '/mylistings/2')
        cy.get("[title='Previous Page Button']").click();
        cy.url().should('include', '/mylistings/1')
      })

  })