export { userDistrict } from '../../../app/helpers/userHelper';

describe('Login', () => {
  it('finds correct text', () => {
    cy.visit('/login');
    cy.get('[data-cy=page-title]').contains('Sign into your account');
    cy.get('[data-cy=title]').contains('Sign into your account');
    cy.get('[data-cy=register-label]').contains('t have an account?');
  });
  it('finds social login part', () => {
    cy.checkSocialLoginSection();
    cy.get('[data-cy=register]')
      .should('contain', `Create one`)
      .should('have.attr', 'href')
      .and('contain', '?register=true');
  });
  it('find email login part and check login confirm page', () => {
    // find email login part
    const email = Cypress.env('email');
    cy.get('[data-cy=email-input]')
      .should('exist')
      .type(email);
    cy.get('[data-cy=email-form]')
      .find('button')
      .should('contain', 'Submit')
      .click();

    // check login confirm page
    cy.checkLoginConfirmPage(email);
  });
});
