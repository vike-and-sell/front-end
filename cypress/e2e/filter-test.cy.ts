describe('Users should be able to filter listings', () => {

    beforeEach(()=>{
      cy.viewport('macbook-13')
      cy.visit('/login')
      cy.get('[data-cy="username-input"]').type('john_doe')
      cy.get('[data-cy="password-input"]').type('Password123!')
      cy.get('[data-cy="signin-button"]').click()
      cy.url().should('not.include', '/login')
      cy.wait(1000)
    })
  
    it('User should be able to filter listings', () => {
        cy.get(".search-bar").click().type("mug");
        cy.get("[title='Search Button']").click();
        cy.get(".filter-button").click();
        cy.get(".filter-component");
        cy.get(".date-toggle");
        cy.get(".price-toggle");
        cy.get(".min-price-input").type("21");
        cy.get(".max-price-input").type("100");
        cy.get(".desc-toggle");
        cy.get(".asc-toggle");
        cy.get(".clear-button");
        cy.get(".apply-button");
      })

  })