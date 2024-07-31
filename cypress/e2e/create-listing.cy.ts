describe('User can create a listing', () => {

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

  it('User can succesfully create a lsiting that is not marked for Charity', () => {
    
    cy.get('[data-cy="nav-bar-lg-div"]').should('exist').and('be.visible').click({ multiple: true })
    cy.get('[data-cy="nav-bar"]').should('exist').and('be.visible').click({ multiple: true, force: true })
    cy.get('[data-cy="create-listing-nav"]').children().should('exist').click({ multiple: true, force: true })
    cy.url().should('include', '/create')

    cy.get('[data-cy="create-title-input"]').type('Sony Xperia A5')
    cy.get('[data-cy="create-price-input"]').clear().type('800')

    //cy.get('[data-cy="create-listing-button"]').click()
  })

  it('User can succesfully create a listing that is marked for Charity', () => {
    
    cy.get('[data-cy="nav-bar-lg-div"]').should('exist').and('be.visible').click({ multiple: true })
    cy.get('[data-cy="nav-bar"]').should('exist').and('be.visible').click({ multiple: true, force: true })
    cy.get('[data-cy="create-listing-nav"]').children().should('exist').click({ multiple: true, force: true })
    cy.url().should('include', '/create')

    cy.get('[data-cy="create-title-input"]').type('Sony Xperia A5')
    cy.get('[data-cy="create-price-input"]').clear().type('800')

    cy.get('[data-cy="create-charity-checkbox"]').click()

    //cy.get('[data-cy="create-listing-button"]').click()

  })

  it('User can not create a listing without a title', () => {
    
    cy.get('[data-cy="nav-bar-lg-div"]').should('exist').and('be.visible').click({ multiple: true })
    cy.get('[data-cy="nav-bar"]').should('exist').and('be.visible').click({ multiple: true, force: true })
    cy.get('[data-cy="create-listing-nav"]').children().should('exist').click({ multiple: true, force: true })
    cy.url().should('include', '/create')

    cy.get('[data-cy="create-title-input"]').type('Sony Xperia A5').clear()
    cy.get('[data-cy="create-price-input"]').clear().type('800')

    cy.get('[data-cy="create-listing-button"]').click()
    cy.get('[data-cy="create-title-error-message"]').should('exist').and('be.visible')
  })

  it('User can not create a listing without a price', () => {
    
    cy.get('[data-cy="nav-bar-lg-div"]').should('exist').and('be.visible').click({ multiple: true })
    cy.get('[data-cy="nav-bar"]').should('exist').and('be.visible').click({ multiple: true, force: true })
    cy.get('[data-cy="create-listing-nav"]').children().should('exist').click({ multiple: true, force: true })
    cy.url().should('include', '/create')

    cy.get('[data-cy="create-title-input"]').type('Sony Xperia A5').clear()
    cy.get('[data-cy="create-price-input"]').clear()

    cy.get('[data-cy="create-listing-button"]').should('be.disabled')
    cy.get('[data-cy="create-price-error-message"]').should('exist').and('be.visible')
  })


})