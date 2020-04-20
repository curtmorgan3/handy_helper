describe('Handy Helper Tests', () => {
  // Sign Up
  it('Registers for an Account', () => {

    /*
    Sign up with new email
    Sign up with existing email
    Check for JWT 
    */

    cy.visit('127.0.0.1:3000');

    cy.contains('Sign Up').click();

    cy.url().should('contain', '/signup');

    cy.get('#login-email').type('curtmorgan3@gmail.com');
    cy.get('#login-pw').type('password');
    cy.get('[name="fName"]').type('Curt');
    cy.get('[name="lName"]').type('Morgan');
    cy.get('[name="phone"]').type('999-999-9999');
    cy.get('[name="type"]').select('Helper');

    cy.get('#signup-btn').click();

    cy.contains('Profile').should('be.visible');
  })
  // Log In
  it('Logs into an Account', () => {

    /*
    Log in with valid credentials
    Log in with invalid credentials
    Check for presence of JWT 
    */

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

  // Identify as helper or customer
    // Identify as helper
    // Identify as customer
    // Try to check both 

  // Label Profile from Array of Skill
    // Select skill from given selection
    // Choose at least one skill
    // Try to choose skill as a customer

  // Input experience in a text field 
    // Require insertion of experience into form
    // Try to insert experience as a user
})