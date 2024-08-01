describe('User can use messaging feature', () => {

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
  
    it('User can succesfully view a chat', () => {
      
      cy.get('[data-cy="nav-bar-lg-div"]').should('exist').and('be.visible').click({ multiple: true })
      cy.get('[data-cy="my-messages-nav"]').should('exist').click({ multiple: true, force: true })
      cy.wait(7000)
      cy.get('[data-cy="chat-pane-item-0"]').click({force: true })
      
    })

    it('User can succesfully send a message', () => {
      
        cy.get('[data-cy="nav-bar-lg-div"]').should('exist').and('be.visible').click({ multiple: true })
        cy.get('[data-cy="my-messages-nav"]').should('exist').click({ multiple: true, force: true })
        cy.wait(7000)
        cy.get('[data-cy="chat-pane-item-0"]').click({force: true })

        cy.get('.chakra-textarea').eq(1).click({force: true }).type('cypress', {force:true}).type('{enter}')
        
      })
  
  })