import { TEST_ACCOUNT_EMAIL } from '../../constants';

describe('Login Page', () => {
  it('Page Content', () => {
    cy.visit('/login');
    cy.get('[data-cy=login-title]')
      .contains('Log into your account');
    cy.get('[data-cy=register-label]')
      .contains('have an account?');
    cy.get('[data-cy=register]')
      .contains('Create one');
    cy.get('[data-cy=facebook-login]')
      .should('exist')
      .contains('Continue with FACEBOOK');
    cy.get('[data-cy=twitter-login]')
      .should('exist')
      .contains('Continue with Twitter');
    // cy.get('[data-cy=google-login]')
    //   .should('exist')
    //   .contains('Continue with GOOGLE');
  });
  it('test Email/Phone Submit', () => {
    // cy.get('[data-cy=id-input]')
    //   .should('exist')
    //   .type(TEST_ACCOUNT_EMAIL);
    // cy.get('[data-cy=id-submit-button]')
    //   .should('exist')
    //   .click();
  });
  // it('test Password Submit', () => {
  //   cy.get('[data-cy=login-pwd-title')
  //     .should('exist')
  //     .contains('Sign into your account');
  //   cy.get('[data-cy=email-label]')
  //     .should('exist')
  //     .contains(TEST_ACCOUNT_EMAIL);
  //   cy.get('[data-cy=redirect-to-login')
  //     .should('have.attr', 'href', '/login')
  //     .contains('Change email');
  //   cy.get('[data-cy=forgot-link]')
  //     .should('exist')
  //     .contains('Forgot your password?')
  //     .click();
  //   cy.get('[data-cy=sent-forgot]')
  //     .should('exist')
  //     .contains('Your password recovery link was sent to')
  //     .contains(TEST_ACCOUNT_EMAIL);
  //   cy.get('[data-cy=password]')
  //     .should('exist')
  //     .type(TEST_ACCOUNT_PWD);
  //   cy.get('[data-cy=custom-button]')
  //     .should('exist')
  //     .click();
  // });
  it('test Site Header', () => {
    cy.testSiteHeader();
  });
  it('test Site Footer', () => {
    cy.testSiteFooter();
  });
});
