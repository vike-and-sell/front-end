describe('User can leave a rating and review', () => {

    beforeEach(()=>{
      cy.viewport('macbook-13')
      cy.visit('/login')
      cy.get('[data-cy="username-input"]').type('andrewyuhu')
      cy.get('[data-cy="password-input"]').type('@Andrewhu123')
      cy.get('[data-cy="signin-button"]').click()
      cy.url().should('not.include', '/login')
      cy.wait(1000)
    })
  
    it('User should be able to view recomendations page', () => {
      cy.visit('/recommendations/1')
      cy.wait(4000)
      cy.get("h1").contains('Your Recommendations');
    })

    it('User should be able to hide charities', () => {
      cy.visit('/recommendations/1')
      cy.wait(4000)
      cy.get("h1").contains('Your Recommendations');
      cy.get('[data-cy="hide-btn"]').click();
      cy.get('[data-cy="show-btn"]').click();
    })

    it('User should be able to access pagination in their rec page', () => {
      cy.visit('/recommendations/1')
      cy.wait(4000)
      cy.get("[title='Next Page Button']").click();
      cy.url().should('include', '/recommendations/2')
      cy.get("[title='Previous Page Button']").click();
      cy.url().should('include', '/recommendations/1')
    })
 

  })