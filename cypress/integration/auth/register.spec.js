import { TEST_ACCOUNT_EMAIL, TEST_ACCOUNT_PWD } from '../../constants';

describe('Register Page', () => {
  it('Page Content', () => {
    cy.visit('/register');
    cy.get('[data-cy=register-title]')
      .contains('Sign up for Good Party');
    cy.get('[data-cy=register-label]')
      .contains('Already have an account?');
    cy.get('[data-cy=redirect-to-login]')
      .should('have.attr', 'href', '/login')
      .contains('login');
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

  it('Register Modal', () => {
    cy.visit('/?host=true');
    cy.get('[data-cy=gp-coming]')
      .should('exist')
      .contains('#goodparty Tuesdays are coming soon');
    cy.get('[data-cy=gp-signup]')
      .should('exist')
      .contains('Sign up to be the first to know!');
  });
});
