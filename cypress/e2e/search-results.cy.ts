describe('User should be able to search for items or users', () => {

  beforeEach(()=>{
    cy.viewport('macbook-13')
    cy.visit('/login')
    cy.get('[data-cy="username-input"]').type('john_doe')
    cy.get('[data-cy="password-input"]').type('Password123!')
    cy.get('[data-cy="signin-button"]').click()
    cy.url().should('not.include', '/login')
    cy.wait(1000)
  })

  it('User should be able to search for a listing', () => {
    cy.get(".search-bar").click().type("mug");
    cy.get("[title='Search Button']").click();
    cy.get("h1").contains('Results for "mug"');
  })

  it('User should be able to search for users', () => {
    cy.get(".search-bar").click().type("john_doe");
    cy.get("[title='Search Button']").click();
    cy.get("h1").contains('Results for "john_doe"');
  })

  it('User should be able to toggle between users and items', () => {
    cy.get(".search-bar").click().type("john_doe");
    cy.get("[title='Search Button']").click();

    const userToggle = cy.get(".users-toggle");
    const listingsToggle = cy.get(".listings-toggle");
    userToggle.click();
    userToggle.should("have.class","bg-pri-blue")
    listingsToggle.click();
    listingsToggle.should("have.class","bg-pri-blue")
   
  })

})