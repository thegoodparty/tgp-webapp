import { TEST_ACCOUNT_EMAIL, TEST_ACCOUNT_PWD } from '../../constants';

describe('Register Page', () => {
  it('Page Content', () => {
    cy.visit('/register');
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
    cy.get('[data-cy=google-login]')
      .should('exist')
      .contains('Continue with GOOGLE');
  });
  it('test Site Header', () => {
    cy.testSiteHeader();
  });
  it('test Site Footer', () => {
    cy.testSiteFooter();
  });
});
