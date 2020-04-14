describe('Handy Helper Tests', () => {
  // Sign Up
  it('Registers for an Account', () => {
    cy.visit('127.0.0.1:3000');

    cy.contains('Sign Up').click();

    cy.url().should('contain', '/signup');

    cy.get('#login-email').type('curtmorgan3@gmail.com');
    cy.get('#login-pw').type('password');
    cy.get('[name="fName"]').type('Curt');
    cy.get('[name="lName"]').type('Morgan');
    cy.get('[name="phone"]').type('999-999-9999');
    cy.get('[name="skill"]').type('Electrical');

    cy.get('#signup-btn').click();

    cy.contains('Profile').should('be.visible');
  })
  // Log In
  it('Logs into an Account', () => {
    cy.visit('127.0.0.1:3000');

    cy.contains('Log In').click();

    cy.url().should('contain', '/signup');

    cy.get('#login-email').type('curtmorgan3@gmail.com');
    cy.get('#login-pw').type('password');

    cy.get('#login-btn').click();

    cy.contains('Profile').should('be.visible');
  })
  // Log Out
  it('Logs out of an Account', () => {
    cy.visit('127.0.0.1:3000');

    cy.contains('Log In').click();

    cy.url().should('contain', '/signup');

    cy.get('#login-email').type('curtmorgan3@gmail.com');
    cy.get('#login-pw').type('password');

    cy.get('#login-btn').click();

    cy.contains('Sign Out').click();

    cy.contains('Log In').should('be.visible');
  })
})