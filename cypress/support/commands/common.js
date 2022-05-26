import { HEADER_LINKS } from "../../../components/shared/navigation/DesktopHeader";
import { FOOTER_COLUMNS } from "../../../components/shared/Footer";
import { TEST_ACCOUNT_EMAIL, TEST_ACCOUNT_PWD, TOKEN, USER_COOKIE,  } from "../../constants";

Cypress.Commands.add('testLoginFlow', () => {
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
  cy.get('[data-cy=google-login]')
    .should('exist')
    .contains('Continue with GOOGLE');

  cy.get('[data-cy=id-input]')
    .should('exist')
    .type(TEST_ACCOUNT_EMAIL);
  cy.get('[data-cy=custom-button]')
    .should('exist')
    .click();

  cy.get('[data-cy=login-pwd-title')
    .should('exist')
    .contains('Sign into your account');
  cy.get('[data-cy=email-label]')
    .should('exist')
    .contains(TEST_ACCOUNT_EMAIL);
  cy.get('[data-cy=redirect-to-login')
    .should('have.attr', 'href', '/login')
    .contains('Change email');
  cy.get('[data-cy=forgot-link]')
    .should('exist')
    .contains('Forgot your password?')
    .click();
  cy.get('[data-cy=sent-forgot]')
    .should('exist')
    .contains('Your password recovery link was sent to')
    .contains(TEST_ACCOUNT_EMAIL);
  cy.get('[data-cy=password]')
    .should('exist')
    .type(TEST_ACCOUNT_PWD);
  cy.get('[data-cy=custom-button]')
    .should('exist')
    .click();
  cy.wait(5000);
});

Cypress.Commands.add('testSiteHeader', () => {
    cy.get('[data-cy=header-link]')
      .should('have.length', HEADER_LINKS.length)
      .each(($el, index) => {
        cy.wrap($el)
          .find('[data-cy=header-link-label]')
          .should('have.attr', 'href', HEADER_LINKS[index].href)
          .contains(HEADER_LINKS[index].label);
      });
    cy.get('[data-cy=header-login')
      .should('have.attr', 'href', "/login")
      .contains('Login');
    cy.get('[data-cy=header-register')
      .should('have.attr', 'href', "/register")
      .contains('Join Us');
});
Cypress.Commands.add('testSiteFooter', () => {
  cy.get('[data-cy=footer-column]')
    .should('have.length', FOOTER_COLUMNS.length)
    .each(($el, index) => {
      cy.wrap($el)
        .find('[data-cy=footer-column-title]')
        .contains(FOOTER_COLUMNS[index].title);
      cy.wrap($el)
        .find('[data-cy=footer-link-wrapper]')
        .should('have.length', FOOTER_COLUMNS[index].links.length)
        .each(($el1, index1) => {
          cy.wrap($el1)
            .find('[data-cy=footer-link]')
            .should('have.attr', 'href', FOOTER_COLUMNS[index].links[index1].link)
            .contains(FOOTER_COLUMNS[index].links[index1].label);
        });
    });
    cy.get('[data-cy=footer-join-us')
      .contains('Not a political party. We’re building free tools to change')
    cy.get('[data-cy=footer-join-us-link')
      .should('have.attr', 'href', "/register");
    const year = new Date().getFullYear();
    cy.get('[data-cy=footer-copyright')
      .contains(`${year} Good Party. All rights reserved.`)
    cy.get('[data-cy=footer-privacy-link')
      .should('have.attr', 'href', "/privacy");
});

Cypress.Commands.add('signInWithDefaultUser', () => {
  cy.setCookie('user', USER_COOKIE);
  cy.setCookie('token', TOKEN);
  cy.reload();
});