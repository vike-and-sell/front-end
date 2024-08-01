describe('User can create a listing', () => {

    beforeEach(()=>{
  
      cy.viewport('macbook-13')
      cy.visit('/login')
      cy.get('[data-cy="username-input"]').type('john_doe')
      cy.get('[data-cy="password-input"]').type('Password123!')
      cy.get('[data-cy="signin-button"]').should('be.visible').click();
      cy.url().should('not.include', '/login')
      cy.wait(1000)
    })
  
    it('User can access the edit button in a listing', () => {
      cy.visit('/listing/7')
      cy.get('[data-cy="menu-button"]').click();
      cy.get('.edit-listing-btn').click();
    })

    it('User can access the edit button in a listing', () => {
        cy.visit('/edit/7')
        cy.get('[data-cy="edit-title-input"]');
        cy.get('[data-cy="edit-price-input"]');
        cy.get('[data-cy="edit-status-dropdown"]');
        cy.get('[data-cy="edit-charity-checkbox"]');
        cy.get('.select-buyer');
      })

      it('User cannot edit a listing with invalid values', () => {
        cy.visit('/edit/7')
        cy.get('[data-cy="edit-title-input"]').clear();
        cy.get('[data-cy="edit-price-input"]').clear();
        cy.get('.price-error');
        cy.get('.title-error');
      })

      it('User cannot edit a listing with invalid values', () => {
        cy.visit('/edit/7')
        cy.get('[data-cy="edit-status-dropdown"]').select("SOLD");
      
        cy.get('[data-cy="edit-buyer-autocomplete"]').type("andrewyuhu{enter}")
        cy.get('[data-cy="edit-listing-button"]').click();
       
      })

      it('User can leave the edit page through cancel', () => {
        cy.visit('/edit/7')
        cy.get("[data-cy='cancel-button']").click();
        cy.url().should('not.include', '/edit')
      })
    
      
    
  
  })