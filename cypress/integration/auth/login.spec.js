import { before } from 'lodash';

export { userDistrict } from '../../../app/helpers/userHelper';

describe('Login', () => {
  beforeEach(() => {
    cy.visit('/login');
  });
  it('finds correct text', () => {
    cy.visit('/login');
    cy.get('[data-cy=page-title]').contains('Sign into your account');
    cy.get('[data-cy=title]').contains('Sign into your account');
    cy.get('[data-cy=register-label]').contains('t have an account?');
  });
  it('finds social login part', () => {
    // cy.checkSocialLoginSection();
    // cy.get('[data-cy=register]')
    //   .should('contain', `Create one`)
    //   .should('have.attr', 'href')
    //   .and('contain', '?register=true');
  });
  it('find email login part for failure', () => {
    cy.get('[data-cy=email-input]')
      .should('exist')
      .type('blueshark0811@gmail.com');
    cy.get('[data-cy=login]')
      .find('button')
      .should('have.attr', 'disabled')
      .and('contain', 'disabled');
    cy.get('[data-cy=password]')
      .should('exist')
      .type('myFirst100');
    cy.get('[data-cy=login]')
      .find('button')
      .should('not.have.attr', 'disabled');
    cy.get('[data-cy=login]').click();
    cy.get('[data-cy=alert').contains('Email or Password are incorrect.');
  });
  it('find email login part with exact user credentials', () => {
    const email = Cypress.env('email1');
    const password = Cypress.env('password');

    cy.get('[data-cy=email-input]')
      .should('exist')
      .type(email);
    cy.get('[data-cy=login]')
      .find('button')
      .should('have.attr', 'disabled')
      .and('contain', 'disabled');
    cy.get('[data-cy=password]')
      .should('exist')
      .type(password);
    cy.get('[data-cy=login]')
      .find('button')
      .should('not.have.attr', 'disabled');
    cy.get('[data-cy=login]').click();
    cy.url().should('contain', '/you');
  });
});
