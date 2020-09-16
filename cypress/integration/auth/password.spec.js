import promisify from 'cypress-promise';
import { parseCookie } from '../../support/utils';

describe('Password Modal', () => {
  let user;
  it('check password modal with signed user', async () => {
    // Email Signed User
    
    if ( Cypress.browser.isHeaded ) {
      cy.signInWithEmail();
      user = await promisify(
        cy.getCookie('user').then(cookie => parseCookie(cookie.value)),
      );
      cy.checkChangePasswordModal(user.hasPassword);

      cy.signInWithDefaultUser();
      user = await promisify(
        cy.getCookie('user').then(cookie => parseCookie(cookie.value)),
      );
      cy.checkChangePasswordModal(user.hasPassword);
    }
    else {
      cy.signInWithEmail();
      cy.checkChangePasswordModal(true);
      cy.signInWithDefaultUser();
      cy.checkChangePasswordModal(false);
    }

    // Social Signed User
    
  });
});
